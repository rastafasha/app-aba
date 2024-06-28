import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { routes } from 'src/app/shared/routes/routes';
import { PatientMService } from '../service/patient-m.service';
import { FileSaverService } from 'ngx-filesaver';
import { DoctorService } from '../../doctors/service/doctor.service';
import * as XLSX from 'xlsx';
import { RolesService } from '../../roles/service/roles.service';
import { BipService } from '../../bip/service/bip.service';
import { Location } from '@angular/common';

declare var $:any;  
@Component({
  selector: 'app-list-patient-m',
  templateUrl: './list-patient-m.component.html',
  styleUrls: ['./list-patient-m.component.scss']
})
export class ListPatientMComponent {
  public routes = routes;

  public patientList: any = [];
  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalDatapatient = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;

  public patient_generals:any = [];
  public patient_id:any;
  public patientid:any;
  public patient_selected:any;
  public text_validation:any;
  public user:any;
  public roles:any = [];
  public permissions:any = [];
  public maladaptives:any = [];
  public doctorPatientList:any = [];
  public locationPatientList:any = [];
  search:any= null;
  status:any= null;
  location_id:any;

  constructor(
    public doctorService: DoctorService,
    public patientService: PatientMService,
    private fileSaver: FileSaverService,
    public roleService: RolesService,
    public bipService: BipService,
    public location: Location,
    ){

  }
  ngOnInit() {
    window.scrollTo(0, 0);
    this.doctorService.closeMenuSidebar();
    this.getTableData();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.roles = this.user.roles[0];
    this.location_id = this.user.location_id;
    
    this.user = this.roleService.authService.user;
    this.getPatiensByDoctor();
    
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
    
  }

  getPatiensByDoctor(){
    this.patientService.getPatientsByDoctor(this.user.id).subscribe((resp:any)=>{
      // console.log(resp);
      this.doctorPatientList = resp.patients.data;
    })
    this.getPatiensByLocation();
  }
  getPatiensByLocation(){
    this.patientService.getPatientByLocations(this.location_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.locationPatientList = resp.patients.data;
    })
  }

  isMaladaptiveBip(){
    this.bipService.getBipByPatient_id(this.patient_id).subscribe((resp:any)=>{
      console.log(resp);
      this.maladaptives = resp.maladaptives;
    })
  }


  isPermission(permission:string){
    if(this.user.roles.includes('SUPERADMIN')){
      return true;
    }
    if(this.user.permissions.includes(permission)){
      return true;
    }
    return false;
  }
 
  private getTableData(): void {
    this.patientList = [];
    this.serialNumberArray = [];

    this.patientService.listPatients(this.search, this.status, this.location_id).subscribe((resp:any)=>{
      
      // console.log(resp);

      this.totalDatapatient = resp.patients.data.length;
      this.patient_generals = resp.patients.data;
      this.patientid = resp.patients.data.id;
      this.patient_id = resp.patients.data.patient_id;
     this.getTableDataGeneral();
    //  this.isMaladaptiveBip();
    })

  }

  getTableDataGeneral(){
    this.patientList = [];
    this.serialNumberArray = [];
    
    this.patient_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
       
        this.patientList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.patientList);
    this.calculateTotalPages(this.totalDatapatient, this.pageSize);
  }
  selectUser(patient:any){
    this.patient_selected = patient;
  }
  deleteRol(){

    this.patientService.deletePatient(this.patient_selected.id).subscribe((resp:any)=>{
      // console.log(resp);

      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{

        let INDEX = this.patientList.findIndex((item:any)=> item.id == this.patient_selected.id);
      if(INDEX !=-1){
        this.patientList.splice(INDEX,1);

        $('#delete_patient').hide();
        $("#delete_patient").removeClass("show");
        $(".modal-backdrop").remove();
        $("body").removeClass();
        $("body").removeAttr("style");
        this.patient_selected = null;
      }
      }

      
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.patientList = this.dataSource.filteredData;
  }

  public searchDataDoct(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.doctorPatientList = this.dataSource.filteredData;
  }
  public searchDataLocation(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.locationPatientList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.patientList.slice();

    if (!sort.active || sort.direction === '') {
      this.patientList = data;
    } else {
      this.patientList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public sortDataDoctor(sort: any) {
    const data = this.doctorPatientList.slice();

    if (!sort.active || sort.direction === '') {
      this.patientList = data;
    } else {
      this.patientList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public sortDataDoctorLocation(sort: any) {
    const data = this.locationPatientList.slice();

    if (!sort.active || sort.direction === '') {
      this.patientList = data;
    } else {
      this.patientList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableDataGeneral();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableDataGeneral();
    this.getPatiensByLocation();
    this.searchDataValue = '';
  }

  private calculateTotalPages(totalDatapatient: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalDatapatient / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
    }
  }

  excelExport(){
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
    const EXCLE_EXTENSION = '.xlsx';

    this.getTableDataGeneral();
    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.patient_generals);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: EXCEL_TYPE});

    this.fileSaver.save(blobData, "clients_db_aba_therapy",)

  }
  csvExport(){
    const CSV_TYPE = 'text/csv';
    const CSV_EXTENSION = '.csv';

    this.getTableDataGeneral();

    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.patient_generals);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'csv', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: CSV_TYPE});

    this.fileSaver.save(blobData, "clients_db_aba_therapy_csv", CSV_EXTENSION)

  }

  txtExport(){
    const TXT_TYPE = 'text/txt';
    const TXT_EXTENSION = '.txt';

    this.getTableDataGeneral();


    //custom code
    const worksheet = XLSX.utils.json_to_sheet(this.patient_generals);

    const workbook = {
      Sheets:{
        'testingSheet': worksheet
      },
      SheetNames:['testingSheet']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type: 'array'});

    const blobData = new Blob([excelBuffer],{type: TXT_TYPE});

    this.fileSaver.save(blobData, "clients_db_aba_therapy", TXT_EXTENSION)

  }

  

  cambiarStatus(data:any){
    let VALUE = data.status;
    console.log(VALUE);
    
    this.patientService.updateStatus(data, data.id).subscribe(
      resp =>{
        // console.log(resp);
        this.getTableData();
      }
    )
  }
}
