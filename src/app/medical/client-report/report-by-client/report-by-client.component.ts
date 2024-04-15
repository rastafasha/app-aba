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
  public pa_number:any;
  public insurances:any=[];
  public insurance_id:any;
  public insuranceiddd:any;
  public insurer_name:any;
  public sponsors:any=[];
  public modifiers:any=[];
  public noteRbt:any=[];
  public pa_assessmentgroup:any=[];
  public noteBcba:any=[];
  public patient:any;
  public patientID:any;
  public patientName:any;
  public doctor_selected_full_name:any;
  public billing_total:number = 0;
  public week_total_hours:number = 0;
  public week_total_units:number = 0;
  public total_hours:number = 0;
  public total_units:number = 0;
  public charges:number = 0;
  public unitPrize:number = 0;
  public xe:number = 0;
  
  public session_date:any;
  public time_in:any;
  public time_out:any;
  public time_in2:any;
  public time_out2:any;
  public pos:any;
  public billed:boolean ;
  public pay:boolean ;
  public md:any;
  public md2:any;
  public pay_selected:any;
  public billed_selected:any;
  public total:any;
  public totalPorPagar:any;
  public resultconFactor:any;
  public unidades:any;
  public porPagar:any;
  public factorPorcentual: number =  1.66666666666667

  doctor_selected:any =null;
  
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
     });

     this.getTableData();
     this.getConfig();
     
     this.billed = false;
    this.pay = false;
     
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




  getConfig(){
    this.clientReportService.config().subscribe((resp:any)=>{
      console.log(resp);
      this.insurances = resp.insurances;
      
      this.sponsors = resp.doctors;

      
      
    })
  }


  private getTableData(): void {
    this.clientReportList = [];
    this.serialNumberArray = [];

    this.clientReportService.showClientReportbyPatient(this.patient_id).subscribe((resp:any)=>{
      
      console.log(resp);
      // traemos la info necesaria del paciente
      this.patientName = resp.full_name;
      this.patientID = resp.patient_id;
      this.noteRbt = resp.noteRbt;
      this.insurance_id = resp.insurer_id;
      
      this.pa_assessments = resp.pa_assessments;
      let jsonObj = JSON.parse(this.pa_assessments);
      this.pa_assessmentsgroup = jsonObj;
      // console.log(this.pa_assessmentsgroup);
      this.cpt = this.pa_assessmentsgroup[0].cpt;
      // console.log(this.cpt); 
      this.n_units = this.pa_assessmentsgroup[0].n_units;
      this.pa_number = this.pa_assessmentsgroup[0].pa_services;
      // console.log(this.n_units); 
      // fin traemos la info necesaria del paciente


      // unimos las respuestas clientReportList y  noteRbt  en una sola lista
      // for (let i=0 ;i < this.arraysUnidos.length; i++){
      //   this.clientReportList.push({...this.arraysUnidos[i], ...JSON.parse(this.noteRbt)});
      //   this.serialNumberArray.push(i+1)
      // };
      // fin de unir las listas
      
      

      this.totalDataClientReport = resp.noteRbt.length;
      this.clientReport_generals = resp.noteRbt;
      this.patient_id = resp.patient_id;
      this.sponsor_id = resp.noteRbt[0].provider_name_g;
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
      console.log(this.sponsor_id);
      console.log("Este es el array final de los reportes", this.clientReportList);

     this.getTableDataGeneral();
    //  this.getWeekTotalHours();
    this.getInsurer();
    this.getDoctor();
    
    //  this.extractDataHours();
    //  this.extractDataUnits();
    })

  }

  

 

  getInsurer(){
    //sacamos los detalles insurance seleccionado
    this.insuranceService.showInsurance(this.insurance_id).subscribe((resp:any)=>{
      console.log(resp);
      this.insuranceiddd= resp.id;
      
      this.insurer_name = resp.insurer_name;
      this.modifiers = resp.notes;
      console.log('modificadores',this.modifiers);
      this.unitPrize = resp.services[0].unit_prize;
      console.log('precio unidad',this.unitPrize);
      this.convertir();
      
    })
  }

  convertir() {
    var hora = 3600;
    var minutos = Math.round((hora) / 60); // da 60
    this.factorPorcentual; // 1.66666666667

    this.resultconFactor = (minutos * this.factorPorcentual)/100; // resultado 1,00000
    this.unidades = this.resultconFactor * 4;
    this.porPagar = this.unitPrize * this.unidades;
    
    console.log("hora",hora);
    console.log("minutos",minutos);
    console.log("factorPorcentual",this.factorPorcentual);
    console.log("resultado factor",this.resultconFactor);
    console.log("unidades",this.unidades);
    console.log("precio",this.unitPrize);
    console.log("esto es lo que se tiene que pagar",this.porPagar );

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
      // console.log(this.week_total_units);
      // console.log(this.n_units);
      // console.log(this.charges);
  }


  //trae el nombre del doctor quien hizo la nota rbt
  getDoctor(){
    this.doctorService.showDoctor(this.sponsor_id).subscribe((resp:any)=>{
      console.log(resp);
      this.doctor_selected = resp.user;
      this.doctor_selected_full_name = resp.user.full_name;
    });
  }


  

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

  // public searchData(value: any): void {
  //   this.dataSource.filter = value.trim().toLowerCase();
  //   this.clientReportList = this.dataSource.filteredData;
  // }

  public searchDataFiltered(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.clientReportList = this.dataSource.filteredData;
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

  this.clientReport_generals.map((res: any, index: number) => {
    const serialNumber = index + 1;
    if (index >= this.skip && serialNumber <= this.limit) {
     
      this.clientReportList.push(res);
      this.serialNumberArray.push(serialNumber);
    }
  });
  this.dataSource = new MatTableDataSource<any>(this.clientReportList);
    this.calculateTotalPages(this.totalDataClientReport, this.pageSize);
  
  
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
    // let tableDataVisible = this.clientReport_generals.slice(this.skip, this.skip + this.limit);
    // // this.totalDataClientReport = this.calcularSumaColumnasTabla(tableDataVisible);
    // // console.log('TOTAL DATABILLING', this.totalDataClientReport);
    // //agregar a arreglo de paginación
    // this.pageSelection.push({ skip: this.skip, limit: this.limit });
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

  addXe(value:any){
    let VALUE = value;
    console.log(VALUE);
  }

  
  isSelectedModifier(value:string){
    this.md = value;
    console.log(this.md);
  }

  isSelectedModifier2(value:string){
    this.md2 = value;
    console.log(this.md2);
  }



  isCheckedBilled(){
    this.billed = !this.billed;
    // if ( event.target.checked ) {
    // }
  }

    isCheckedPay(){
      this.pay = !this.pay;
      // if ( event.target.checked ) {
      // }
    }



  save(data:any){
    let VALUE = {
      sesion_date: data.session_date,
      pos: data.pos,
      time_in: data.time_in,
      time_out: data.time_out,
      time_in2: data.time_in2,
      time_out2: data.time_out2,
      cpt: this.cpt,
      md: this.md,
      md2: this.md2,
      xe: this.xe,
      charges: data.total_units * this.unitPrize ,
      n_units: this.n_units,
      provider_name_g: data.provider_name_g,
      pa_number: this.pa_number,
      billed: this.billed,
      pay: this.pay,
      
    };
    // if(this.md2.value === 'XE' ||this.md.value ==='XE')
    //   this.xe= data.total_units * this.unitPrize * this.xe,
    
    console.log(VALUE);
    
    // this.patientService.updateStatus(data, data.id).subscribe(
    //   resp =>{
    //     // console.log(resp);
    //     this.getTableData();
    //   }
    // )
  }
}
