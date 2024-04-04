import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { MatTableDataSource } from '@angular/material/table';
import { RolesService } from '../../roles/service/roles.service';
import { InsuranceService } from '../../insurance/service/insurance.service';
import { ClientReportService } from '../client-report.service';
declare var $:any;  

@Component({
  selector: 'app-report-by-client',
  templateUrl: './report-by-client.component.html',
  styleUrls: ['./report-by-client.component.scss']
})
export class ReportByClientComponent {
  public searchDataDoctor = '';
  public date_start:any;
  public date_end:any;

  patient_id:any;
  doctor_id:any;
  patient_selected:any;
  client_selected:any;
  billing_selected:any;
  sponsor_id:any;
  user:any;



  public clientReportList: any = [];
  public clientReport_generals:any = [];
  dataSource!: MatTableDataSource<any>;
  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 7;
  public totalDataClientReport = 0;
  public skip = 0;
  public limit: number = this.pageSize;
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;
  public text_validation:any;

  public roles:any=[];
  public permissions:any=[];
  public pa_assessments:any=[];
  public pa_assessmentsgroup:any=[];
  public cpt:any;
  public n_units:any;
  public insurances:any=[];
  public insurance_id:any;
  public insuranceiddd:any;
  public insurer_name:any;
  public sponsors:any=[];
  public modifiers:any=[];
  public pa_assessmentgroup:any=[];
  public patient:any;
  public patientID:any;
  public patientName:any;
  public doctor_selected:any;
  public doctor_selected_full_name:any;
  public billing_total:number = 0;
  public week_total_hours:number = 0;
  public week_total_units:number = 0;
  public total_hours:number = 0;
  public total_units:number = 0;
  public charges:number = 0;
  public unitPrize:number = 0;
  
  constructor(
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public clientReportService: ClientReportService,
    public doctorService: DoctorService,
    public roleService: RolesService,
    public insuranceService: InsuranceService,
    public patientService: PatientMService,
  ){}

  ngOnInit(): void {
    
    // window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.id;
      
      // this.patient_id= resp.patient_id;
      // console.log(this.client_id);
     })
    //  this.getNotesByPatient();
     this.getTableData();
     this.getProfileBilling();
     this.getConfig();
     this.getPatient();
     
     
     
     this.doctorService.getUserRoles();
    // let USER = localStorage.getItem("user");
    // this.user = JSON.parse(USER ? USER: '');
    // this.doctor_id = this.user.id;
    this.user = this.roleService.authService.user;
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


  getPatient(){
    this.patientService.getPatientByPatientid(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.patient = resp.patient;
      this.patientID = this.patient.patient_id;
      this.patientName = this.patient.first_name+' '+this.patient.last_name;



    })
  }

  
  // getNotesByPatient(){
  //   this.clientReportService.showBillingbyPatient(this.patient_id).subscribe((resp:any)=>{
  //     console.log(resp);
  //   })
  // }

  // trae el perfil del usuario
  getProfileBilling(){
    this.clientReportService.showClientReportProfile(this.patient_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp.patient;
      //convierto la data de la coleccion json para extraer los datos
      this.pa_assessments = resp.pa_assessments;
      let jsonObj = JSON.parse(this.pa_assessments);
      this.pa_assessmentsgroup = jsonObj;
      console.log(this.pa_assessmentsgroup);
      this.cpt = this.pa_assessmentsgroup[0].cpt;
      // console.log(this.cpt); 
      this.n_units = this.pa_assessmentsgroup[0].n_units;
      // console.log(this.n_units); 
    });
  }

  getConfig(){
    this.clientReportService.config().subscribe((resp:any)=>{
      console.log(resp);
      this.insurances = resp.insurances;
      this.insurance_id = resp.insurances.length > 0 ? resp.insurances[0].id : '';
      // console.log(this.insurance_id);
      this.sponsors = resp.doctors;

      //sacamos los detalles insurance seleccionado
      this.insuranceService.showInsurance(this.insurance_id).subscribe((resp:any)=>{
        console.log(resp);
        this.insuranceiddd= resp.id;
        
        this.insurer_name = resp.insurer_name;
        this.modifiers = resp.notes;
        console.log(this.modifiers);
        this.unitPrize = resp.services[0].unit_prize;
        console.log(this.unitPrize);
        
      })
      
    })
  }


  private getTableData(): void {
    this.clientReportList = [];
    this.serialNumberArray = [];

    this.clientReportService.showClientReportbyPatient(this.patient_id).subscribe((resp:any)=>{
      
      console.log(resp);

      this.totalDataClientReport = resp.clientReports.length;
      this.clientReport_generals = resp.clientReports;
      this.patient_id = resp.clientReports.patient_id;
      this.sponsor_id = resp.clientReports;
      //hacemos un recorrido por la respuesta
      for (let i in this.clientReport_generals) {
          let clientReportTrimestral = this.clientReport_generals[i];
          
          if (!this.serialNumberArray.includes(clientReportTrimestral.sponsor_id)) {
            this.serialNumberArray.push(clientReportTrimestral.serial_number);
            this.clientReportList.push(clientReportTrimestral);
          }else{
            
            for (let j in this.clientReportList) {
              if (this.clientReportList[j].sponsor_id == clientReportTrimestral.sponsor_id){
                this.clientReportList[j]=clientReportTrimestral;
              }
              
            }
          }
          
      };
      console.log("este es el array de seriales");
      console.log(this.serialNumberArray);
      console.log("Este es el array final de los reportes", this.clientReportList);

    //   setTimeout(()=>{
    //     this.dtTrigger.next();
    //   },500);
    // });
      // console.log(this.sponsor_id);

     this.getTableDataGeneral();
    //  this.getWeekTotalHours();
    //  this.getDoctor();
     this.extractDataHours();
    //  this.extractDataUnits();

    })

  }

  extractDataHours(){
    // recorrer el array de billing_general para extraer la data
    let hours_group: string[] = [] ;
    let units_group: string[] = [] ;
      const extractedData = this.clientReport_generals

      let array = this.clientReport_generals;
      for (this.clientReport_generals of array) {
        hours_group.push(this.clientReport_generals.total_hours)
        units_group.push(this.clientReport_generals.total_units)
      }
      // console.log(hours_group);
      // console.log(units_group);
      // obtenemos el total de las horas en un rango de 7 dias  atras
      var suma=0;
      for (var i = hours_group.length - 1; i >= Math.max(0, hours_group.length - 7) ; i--) {
          suma += parseInt(hours_group[i], 10) || 0;  
      }
      // this.week_total_hours = suma / Math.min(7, hours_group.length);// saca el promedio
      this.week_total_hours = suma ; // saca la suma
      console.log("total semanal "+ this.week_total_hours );

      // obtenemos el total de las unidades en un rango de 7 dias  atras
      var sumaunit=0;
      for (var i = units_group.length - 1; i >= Math.max(0, units_group.length - 7) ; i--) {
          sumaunit += parseInt(units_group[i], 10) || 0;  
      }
      // this.week_total_units = sumaunit / Math.min(7, units_group.length);// saca el promedio
      this.week_total_units = sumaunit ; // saca la suma
      console.log("total semanal "+ this.week_total_units );

      // saco el valor de charges multiplicando el total de unidades por semana por el valor del cpt o n_units
      // this.getCharges();

      
      
  }

  getCharges(){
    this.charges = this.week_total_units * this.n_units;
      console.log(this.week_total_units);
      console.log(this.n_units);
      console.log(this.charges);
  }


  //trae el nombre del doctor quien hizo la nota rbt
  getDoctor(){
    this.doctorService.showDoctor(this.sponsor_id).subscribe((resp:any)=>{
      console.log(resp);
      // this.doctor_selected = resp.user;
      // this.doctor_selected_full_name = resp.user.full_name;
    });
  }

  // getDoctorRbt1(){
  //   this.doctorService.showDoctor(this.rbt_id).subscribe((resp:any)=>{
  //     console.log(resp);
  //     this.doctor_selected_rbt = resp.user;
  //     this.doctor_selected_full_name_rbt = resp.user.full_name;
  //   });
  // }


  

  public sortData(sort: any) {
    const data = this.clientReportList.slice();

    if (!sort.active || sort.direction === '') {
      this.clientReportList = data;
    } else {
      this.clientReportList = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.clientReportList = this.dataSource.filteredData;
  }

  public searchDataFiltered() {
    // this.dataSource.filter = value.trim().toLowerCase();
    // this.patientList = this.dataSource.filteredData;
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.getTableData();
  }

  getTableDataGeneral(){
    this.clientReportList = [];
  this.serialNumberArray = [];
  this.totalDataClientReport = 0;

  if (Array.isArray(this.clientReport_generals)) {
    //extraer la data para sumar lo que se muestra en un  paginado 
    //pero no funciona
    
    // const startIndex = this.skip;
    // const endIndex = Math.min(startIndex + this.pageSize, this.clientReport_generals.length);
    // this.clientReportList = this.clientReport_generals.slice(startIndex, endIndex);
    // for (let i = startIndex; i < endIndex; i++) {
    //   const serialNumber = i + 1;
    //   this.serialNumberArray.push(serialNumber);
    //   this.totalDataClientReport += this.clientReportList[i - startIndex].amount;
    // }
    // This block will execute if the this.clientReport_generals is an array.
    this.clientReport_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.clientReportList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.clientReportList);
    this.calculateTotalPages(this.totalDataClientReport, this.pageSize);
  } else {
    // Extract the array if the response is not an array.
    if (Array.isArray(this.clientReport_generals)) {
      this.clientReport_generals = this.clientReport_generals;
      // this.getTableDataGeneral();
      console.log(this.clientReport_generals);
    }
  }
  }

  // getTableDataGeneral2() {
  //   this.clientReportList = [];
  //   this.serialNumberArray = [];
  //   this.totalDataClientReport = 0;
  
  //   if (Array.isArray(this.clientReport_generals)) {
  //     const startIndex = this.skip;
  //     const endIndex = Math.min(startIndex + this.pageSize, this.clientReport_generals.length);
  //     this.clientReportList = this.clientReport_generals.slice(startIndex, endIndex);
  //     for (let i = startIndex; i < endIndex; i++) {
  //       const serialNumber = i + 1;
  //       this.serialNumberArray.push(serialNumber);
  //       this.totalDataClientReport += this.clientReportList[i - startIndex].amount;
  //     }
  //     this.dataSource = new MatTableDataSource<any>(this.clientReportList);
  //     this.calculateTotalPages(this.totalDataClientReport, this.pageSize);
  //   } else {
  //     if (Array.isArray(this.clientReport_generals.data)) {
  //       this.clientReport_generals = this.clientReport_generals.data;
  //       this.getTableDataGeneral();
  //     }
  //   }
  // }
  
  // onPaginateChange(event: any) {
  //   this.skip = event.pageIndex * this.pageSize;
  //   this.totalDataClientReport += this.getPageTotal();
  //   this.getTableDataGeneral();
  // }
  
  getPageTotal(): number {
    const endIndex = Math.min(this.skip + this.pageSize, this.clientReportList.length);
    return this.clientReportList.slice(this.skip, endIndex).reduce((acc, cur) => acc + cur.amount, 0);
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
    // this.getPageTotal();
    this.searchDataValue = '';
    //traer la suma del total de lo que se ve...
    let tableDataVisible = this.clientReport_generals.slice(this.skip, this.skip + this.limit);
    // this.totalDataClientReport = this.calcularSumaColumnasTabla(tableDataVisible);
    // console.log('TOTAL DATABILLING', this.totalDataClientReport);
    //agregar a arreglo de paginación
    this.pageSelection.push({ skip: this.skip, limit: this.limit });
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
  selectUser(biilling:any){
    this.billing_selected = biilling;
  }
  deleteRol(){
    this.clientReportService.deleteClientReport(this.billing_selected.id).subscribe((resp:any)=>{
      // console.log(resp);

      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{

        let INDEX = this.clientReportList.findIndex((item:any)=> item.id == this.billing_selected.id);
      if(INDEX !=-1){
        this.clientReportList.splice(INDEX,1);

        $('#delete_patient').hide();
        $("#delete_patient").removeClass("show");
        $(".modal-backdrop").remove();
        $("body").removeClass();
        $("body").removeAttr("style");
        this.billing_selected = null;
      }
      }

      
    })
  }
}
