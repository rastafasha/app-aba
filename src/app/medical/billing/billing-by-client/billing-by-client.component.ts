import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { MatTableDataSource } from '@angular/material/table';
import { RolesService } from '../../roles/service/roles.service';
declare var $:any;  
import { routes } from 'src/app/shared/routes/routes';
import { BillingService } from '../billing.service';
import { InsuranceService } from '../../insurance/service/insurance.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-billing-by-client',
  templateUrl: './billing-by-client.component.html',
  styleUrls: ['./billing-by-client.component.scss']
})
export class BillingByClientComponent {

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



  public billingList: any = [];
  public billing_generals:any = [];
  dataSource!: MatTableDataSource<any>;
  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 7;
  public totalDataBilling = 0;
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
  public patient:any;
  public patientID:any;
  public doctor_selected:any;
  public doctor_selected_full_name:any;
  public billing_total:number = 0;
  public week_total_hours:number = 0;
  public week_total_units:number = 0;
  public total_hours:number = 0;
  public total_units:number = 0;
  
  constructor(
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public billingService: BillingService,
    public doctorService: DoctorService,
    public roleService: RolesService,
    public insuranceService: InsuranceService,
    public patientService: PatientMService,
    public location: Location,
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
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
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

    })
  }

  
  // getNotesByPatient(){
  //   this.billingService.showBillingbyPatient(this.patient_id).subscribe((resp:any)=>{
  //     console.log(resp);
  //   })
  // }

  // trae el perfil del usuario
  getProfileBilling(){
    this.billingService.showBillingProfile(this.patient_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp.patient;
      //convierto la data de la coleccion json para extraer los datos
      this.pa_assessments = resp.pa_assessments;
      let jsonObj = JSON.parse(this.pa_assessments) || '';
      this.pa_assessmentsgroup = jsonObj;
      // console.log(this.pa_assessmentsgroup);
      this.cpt = this.pa_assessmentsgroup[0].cpt;
      // console.log(this.cpt); 
      this.n_units = this.pa_assessmentsgroup[0].n_units;
      // console.log(this.n_units); 
    });
  }

  getConfig(){
    this.billingService.config().subscribe((resp:any)=>{
      console.log(resp);
      this.insurances = resp.insurances;
      this.insurance_id = resp.insurances.length > 0 ? resp.insurances[0].id : '';
      // console.log(this.insurance_id);
      this.sponsors = resp.doctors;

      this.insuranceService.showInsurance(this.insurance_id).subscribe((resp:any)=>{
        this.insuranceiddd= resp.id;
        
        this.insurer_name = resp.insurer_name;
        
      })

      // this.doctorService.showDoctor(this.sponsor_id).subscribe((resp:any)=>{
      //   console.log(resp);
      // })
    })
  }


  private getTableData(): void {
    this.billingList = [];
    this.serialNumberArray = [];

    this.billingService.showBillingbyPatient(this.patient_id).subscribe((resp:any)=>{
      
      console.log(resp);

      this.totalDataBilling = resp.billings.length;
      this.billing_generals = resp.billings;
      this.patient_id = resp.billings.patient_id;
      this.sponsor_id = resp.billings.sponsor_id;

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
      const extractedData = this.billing_generals

      let array = this.billing_generals;
      for (this.billing_generals of array) {
        hours_group.push(this.billing_generals.total_hours)
        units_group.push(this.billing_generals.total_units)
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
  

  }


  //trae el nombre del doctor quien hizo la nota rbt
  getDoctor(){
    this.doctorService.showDoctor(this.sponsor_id).subscribe((resp:any)=>{
      console.log(resp);
      // this.doctor_selected = resp.user;
      // this.doctor_selected_full_name = resp.user.full_name;
    });
  }


  

  public sortData(sort: any) {
    const data = this.billingList.slice();

    if (!sort.active || sort.direction === '') {
      this.billingList = data;
    } else {
      this.billingList = data.sort((a, b) => {
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
    this.billingList = this.dataSource.filteredData;
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
    this.billingList = [];
  this.serialNumberArray = [];
  this.totalDataBilling = 0;

  if (Array.isArray(this.billing_generals)) {
    //extraer la data para sumar lo que se muestra en un  paginado 
    //pero no funciona
    
    // const startIndex = this.skip;
    // const endIndex = Math.min(startIndex + this.pageSize, this.billing_generals.length);
    // this.billingList = this.billing_generals.slice(startIndex, endIndex);
    // for (let i = startIndex; i < endIndex; i++) {
    //   const serialNumber = i + 1;
    //   this.serialNumberArray.push(serialNumber);
    //   this.totalDataBilling += this.billingList[i - startIndex].amount;
    // }
    // This block will execute if the this.billing_generals is an array.
    this.billing_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {
        this.billingList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.billingList);
    this.calculateTotalPages(this.totalDataBilling, this.pageSize);
  } else {
    // Extract the array if the response is not an array.
    if (Array.isArray(this.billing_generals)) {
      this.billing_generals = this.billing_generals;
      // this.getTableDataGeneral();
      console.log(this.billing_generals);
    }
  }
  }

  
  onPaginateChange(event: any) {
    this.skip = event.pageIndex * this.pageSize;
    this.totalDataBilling += this.getPageTotal();
    this.getTableDataGeneral();
  }
  
  getPageTotal(): number {
    const endIndex = Math.min(this.skip + this.pageSize, this.billingList.length);
    return this.billingList.slice(this.skip, endIndex).reduce((acc, cur) => acc + cur.amount, 0);
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
    let tableDataVisible = this.billing_generals.slice(this.skip, this.skip + this.limit);
    // this.totalDataBilling = this.calcularSumaColumnasTabla(tableDataVisible);
    // console.log('TOTAL DATABILLING', this.totalDataBilling);
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
    this.billingService.deleteBilling(this.billing_selected.id).subscribe((resp:any)=>{
      // console.log(resp);

      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{

        let INDEX = this.billingList.findIndex((item:any)=> item.id == this.billing_selected.id);
      if(INDEX !=-1){
        this.billingList.splice(INDEX,1);

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
