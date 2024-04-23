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
import Swal from 'sweetalert2';
import { NoteRbtService } from '../../notes/services/note-rbt.service';
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
  billing_selected:any;
  sponsor_id:any;
  noterbt_id:any;
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
  public is_xe:boolean;
  
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
  public horaTrabajada:any;
  public factHoras:any;
  public totalHoras:any;
  public totalUnidades:any;
  public units:any;
  public hoursPerUnit:any;
  public timePerUnit:any;
  
  public tecnicoRbts:any;
  public supervisor:any;
  public npi:any;
  public rbt_id: any;
  public rbt2_id: any;
  public bcba_id: any;
  public bcba2_id: any;
  public doctor_selected_bcba: any;
  public full_name: any;
  public doctors: any;
  public tecnicoDoctorNames: any;

  public providersSponsorsList:any;
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
    public noteRbtService: NoteRbtService,
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
      this.patientName = resp.patient.full_name;
      this.patientID = resp.patient.patient_id;
      this.insurance_id = resp.patient.insurer_id;
      this.billed = resp.noteRbts;
      this.pay = resp.noteRbts;

      // obtengo la info resumida de las notas rbt
      this.noteRbt = resp.noteRbts;
      // aqui traigo los nombres de los doctores relacionados al paciente
      this.doctors = resp.doctors;
      this.supervisor = resp.noteRbts.supervisor;
      this.tecnicoRbts = resp.noteRbts.tecnicoRbts;

      // de this.noteRbt extraer los nombres de los doctores  que estan en el array y guardarlos
      // for (let i=0;i<this.noteRbt.length;i++){
      //   let doctor = this.noteRbt[i];
      //   if (!this.tecnicoDoctorNames.includes(doctor.tecnicoRbts)){
      //     this.doctors.push(doctor.name)
      //   }
      //   console.log(this.tecnicoDoctorNames);
        
      // };


      // let INDEX = this.noteRbt.findIndex((tecnicoRbts:any)=> tecnicoRbts);
      // if(INDEX != -1){
      //   this.noteRbt.splice(INDEX,1);
      //   console.log(this.tecnicoRbts);
      // }
      
      

      this.rbt_id = resp.patient.rbt_id;
      this.rbt2_id = resp.patient.rbt2_id;
      this.bcba_id = resp.patient.bcba_id;
      this.bcba2_id = resp.patient.bcba2_id;

      this.pa_assessments = resp.pa_assessments;
      let jsonObj = JSON.parse(this.pa_assessments);
      this.pa_assessmentsgroup = jsonObj;
      
      // aqui deberia ser el mas reciente.. 
      //quizas se pueda cambiar de desc a asc para que agarre el mas reciente
      this.cpt = this.pa_assessmentsgroup[0].cpt;
      //igual aqui
      this.n_units = this.pa_assessmentsgroup[0].n_units;
      // igual aqui
      this.pa_number = this.pa_assessmentsgroup[0].pa_services;
      
      

      this.totalDataClientReport = resp.noteRbts.length;
      this.clientReport_generals = resp.noteRbts;
      this.patient_id = resp.patient_id;

      for (let i=0;i<this.pa_assessmentsgroup.length;i++){
        if (!this.serialNumberArray.includes(this.pa_assessmentsgroup[i].serial_number)) {
          this.serialNumberArray.push(this.pa_assessmentsgroup[i].serial_number)
        }
        
        this.clientReportList.push(this.pa_assessmentsgroup[i]);
      };

      

     this.getTableDataGeneral();
     this.getInsurer();
     this.getDoctorRBT();
     this.getDoctorBcba();
    //  this.extractDataHours();
    })

  }

  

 

  getInsurer(){
    //sacamos los detalles insurance seleccionado
    this.insuranceService.showInsurance(this.insurance_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.insuranceiddd= resp.id;
      
      this.insurer_name = resp.insurer_name;
      this.modifiers = resp.notes;
      // console.log('modificadores',this.modifiers);
      this.unitPrize = resp.services[0].unit_prize;
      // console.log('precio unidad',this.unitPrize);
      // this.convertirHOra();
      
    })
  }
 


  //trae el nombre del doctor quien hizo la nota rbt
  getDoctorRBT(){
    this.doctorService.showDoctor(this.rbt_id).subscribe((resp:any)=>{
      console.log('rbt',resp);
      this.doctor_selected = resp.user;
      this.full_name = resp.user.full_name;
    });
  }

  getDoctorBcba(){
    this.doctorService.showDoctor(this.bcba_id).subscribe((resp:any)=>{
      console.log('bcba',resp);
      this.npi = resp.user.npi;
    });
  }


  convertirHOra() {
    
    this.factorPorcentual; // 1.66666666667
    
    this.horaTrabajada = this.clientReportList[0].total_hours; 
    
    this.resultconFactor = this.clientReportList[0].total_hoursFactor; 
    this.unidades = this.clientReportList[0].total_units; 
    
    this.porPagar = this.unitPrize * this.unidades;
    
    console.log("hora trabajada",this.horaTrabajada);
    console.log("factorPorcentual",this.factorPorcentual);
    console.log("resultado factor",this.resultconFactor);
    console.log("unidades",this.unidades);
    console.log("precio",this.unitPrize);
    console.log("esto es lo que se tiene que pagar",this.porPagar );

    }
  convertir() {
    var hora = 3600;//segundos
    var unidad = 900; //15 min 1-unidad  900 segundos
    var minutos = Math.round((hora) / 60); // da 60
    console.log("minutos ", minutos);
    // horaensegudos  / unidadensegundos = 4 

    var unidadminutos =  (minutos * unidad) / hora ; //da 4
    console.log("Minutos en Unidades", unidadminutos );// 15 
    // entonces si 1 es igual a 60  minutos, 1/60 =  1/60*4 = 1
    //  por lo tanto para pasar de minutos a unidades hay que multiplicar entre 1/60 y por el numero de veces que/120 = 1/12/120 2 
    this.hoursPerUnit = 1 / minutos;
    console.log("horas por unidad ", this.hoursPerUnit);
    this.timePerUnit = this.hoursPerUnit * 60;
    console.log("Tiempo por unidad ", this.timePerUnit);
    
    // 4 unidades es 1 hora 900 x4 = 3600
    // para pasar a horas dividimos entre la cantidad de unidades por una hora (en este caso 15)
    this.totalUnidades = Math.round((minutos / unidad));
    this.totalHoras = Math.round((minutos / unidad));
    console.log("unidades totales ", this.totalUnidades);
    
    this.factorPorcentual; // 1.66666666667
    
    this.horaTrabajada = this.clientReportList[0].total_hours; // resultado 1.45 , llevarla a hora 14500
    // si una hora son 3600 segundos , cuanto es 1:45  ???
    // son 5400 segundos
    //  por tanto, 1/5400 * 100 = 1.8925 .......
    // para redondear a dos decimales se usa toFixed(2)
    // como llevo 145 a 5400 segundos ?
    this.factHoras = (1/minutos*5400)*100 ;
    console.log("el factor de conversión",this.factorPorcentual);


    let seconds: number = this.horaTrabajada;
    let totalSeconds: number = seconds * 5400 / this.horaTrabajada;
    console.log("Total horas trabajadas: " + totalSeconds); 


    this.resultconFactor = (totalSeconds * this.factorPorcentual)/100; // resultado 1,00000
    // this.unidades = this.resultconFactor * 4;
    // this.unidades = this.resultconFactor * this.totalUnidades ;
    this.unidades = this.horaTrabajada / hora;
    this.porPagar = this.unitPrize * this.unidades;
    
    console.log("hora",hora);
    console.log("minutos",minutos);
    console.log("hora trabajada",this.horaTrabajada);
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

  public searchData() {
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


  onPaginateChange(event: any) {
    this.skip = event.pageIndex * this.pageSize;
    this.totalDataClientReport += this.getPageTotal();
    this.getTableDataGeneral();
  }
  
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
    console.log(this.billed);
    // if ( event.target.checked ) {
    // }
  }

    isCheckedPay(){
      this.pay = !this.pay;
      console.log(this.pay);
      // if ( event.target.checked ) {
      // }
    }



  save(data:any){
    let VALUE = {
      session_date: data.session_date,
      pos: data.pos,
      total_hours:data.total_hours,
      cpt_code: this.cpt,
      md: this.md,
      md2: this.md2,
      xe: this.xe,
      total_units: data.total_units,
      charges: data.session_units_total * this.unitPrize,
      // n_units: this.n_units,
      pa_number: this.pa_number,
      billed: data.billed,
      pay: data.pay,
      sponsor_id: data.provider_name_g,
      patient_id: this.patient_id,
      insurer_id: this.insurance_id,
      noterbt_id: data.id,
      npi: this.npi,
      
    };
    let VALUE2 = {
      pa_number: this.pa_number,
      billed: data.billed,
      pay: data.pay,
      // noterbt_id: data.id,
      
    };
    // if(this.md2.value === 'XE' ||this.md.value ==='XE')
    //   this.xe= data.total_units * this.unitPrize * this.xe,
    
    console.log(VALUE);
    
    if(this.billing_selected){//si  tiene bip se agrega a la informacion de la consulta

      this.clientReportService.udpate(VALUE, this.billing_selected).subscribe((resp:any)=>{
        // console.log(resp);
        // this.text_success = 'Bip Updated'
        Swal.fire('Updated', `Bip Updated successfully!`, 'success');
        this.ngOnInit();
      })
      this.noteRbtService.editNote(VALUE2,data.id).subscribe((resp:any)=>{
        console.log(resp);
      })
      
    }else{ 
      
      //crear
      this.clientReportService.create(VALUE).subscribe((resp:any)=>{
        // console.log(resp);
        // this.text_success = 'Se guardó la informacion de la cita médica'
        Swal.fire('Created', `Created successfully!`, 'success');
        this.ngOnInit();
      })

      this.noteRbtService.editNote(VALUE2,data.id ).subscribe((resp:any)=>{
        console.log(resp);
        
        
      })
    }
  }
}
