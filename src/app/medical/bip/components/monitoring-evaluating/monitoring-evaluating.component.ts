import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { GoalFamilyEnvolmentService } from '../../service/goal-family-envolment.service';
import { MonitoringEvaluatingService } from '../../service/monitoring-evaluating.service';

@Component({
  selector: 'app-monitoring-evaluating',
  templateUrl: './monitoring-evaluating.component.html',
  styleUrls: ['./monitoring-evaluating.component.scss']
})
export class MonitoringEvaluatingComponent {

  
  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';


  public goal: any;
  public lto: any;
  public date: Date;
  public decription: any;
  public status: any;
  public rbt_training_goals: any = [];
  public training_goals: any = [];
  public monitoring_status_sto_edit: any = [];
  
  public client_id: any;
  public user: any;
  public doctor_id: any;
  public client_selected: any;
  public patient_id: any;
  public bip_selected: any;
  public bip_selectedId: any;
  public bip_selectedIdd: any;
  public maladaptives: any;


  public monitorings: any;
  public monitoringtid: any;
  public client_id_monitorings: any;
  public monitorid: any;
  public lto_edit: any;


  public current_status: any;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public monitoringEvaluatingService:MonitoringEvaluatingService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    
    // window.scrollTo(0, 0);//inicia la vista siempre desde arriba
    
    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.patient_id;// la respuesta se comienza a relacionar  en este momento con un cliente especifico
      this.getProfileBip(); // se solicita la info del perfil del usuario
      // this.getGoalbyPatient(); // se solicita la info del perfil del usuario
    })
    
    
    this.ativatedRoute.params.subscribe( ({id}) => this.getBip()); // se solicita la info del perfil del bip
    let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: '');//  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
    
  }

  //obtenemos el perfil  del paciente por el id de la ruta
  getProfileBip(){
    this.bipService.showBipProfile(this.patient_id).subscribe((resp:any)=>{
      // console.log('profilebip', resp);
      this.client_selected = resp;//convertimos la respuesta en un variable

      this.client_id = this.client_selected.patient.id;
      
      if (this.patient_id != null) {
        this.getPatientGoalFamilyEnvolments(this.patient_id);
      }
    });

  }

  //obtenemos el bip por el id 
  getBip(){
    if (this.patient_id !== null && this.patient_id !== undefined) {
      this.bipService.getBipByUser(this.patient_id).subscribe((resp:any)=>{
        // console.log('bip',resp);
  
        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selectedId = resp.id; //convertimos la respuesta en un variable
        this.bip_selectedIdd = this.bip_selected.bip.id; //convertimos la respuesta en un variable
        this.maladaptives =this.bip_selected.maladaptives; //convertimos la respuesta en un variable 
  
      })
    }
    
    
  }

  //obtenemos los tipo goals: sustituions del paciente por el patient_id si existe, 
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoalFamilyEnvolments(patient_id){
    this.monitoringEvaluatingService.getMonitoringEvaluatingbyPatientId(patient_id).subscribe((resp:any)=>{
      // console.log('goals sustition by patientid',resp);
      this.monitorings = resp.monitoringEvaluatingPatientIds.data;
      this.monitoringtid = resp.monitoringEvaluatingPatientIds.data[0].id;
      this.training_goals = resp.monitoringEvaluatingPatientIds.data[0].rbt_training_goals;
      this.client_id_monitorings = resp.monitoringEvaluatingPatientIds.data[0].client_id;
      
      
      
    })
  }


  addDocument(){
    this.training_goals.push({
      lto: this.lto,
      status: this.status,
      date: this.date,
    })
    this.lto = '';
    this.status = '';
    this.date = null;
  }

  deleteDocument(i:any){
    this.training_goals.splice(i,1);
  }

  cambiarStatusSto(goalsto:any){
    this.monitoring_status_sto_edit = goalsto;
    // console.log(this.monitoring_status_sto_edit.status_sto);

    let data ={
      rbt_training_goals: this.training_goals,
    }
    
    this.monitoringEvaluatingService.editMonitoringEvaluating(data, this.monitoringtid).subscribe(
      resp =>{
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      }
    )
  }
  cambiarLTO(goalsto:any){
    this.lto_edit = goalsto;
    

    let data ={
      rbt_training_goals: this.training_goals,
    }
    
    this.monitoringEvaluatingService.editMonitoringEvaluating(data, this.monitoringtid).subscribe(
      resp =>{
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      }
    )
  }


  save(){
    this.text_validation = '';
    if(!this.training_goals ){
      this.text_validation = 'Is required this information ';
      return;
    }

    let data ={
      id:this.monitoringtid,
      bip_id: this.bip_selectedIdd,
      patient_id: this.patient_id,
      client_id: this.client_id,
      rbt_training_goals: this.training_goals,
    }

    if(this.client_id_monitorings && this.monitoringtid){

      this.monitoringEvaluatingService.editMonitoringEvaluating(data, this.monitoringtid).subscribe((resp:any)=>{
        // console.log(resp);
        // this.text_success = 'Goal Updated'
        Swal.fire('Updated', ` Monitoring Evaluating Updated successfully!`, 'success');
        this.ngOnInit();
      })
      
    }else{
      
      this.monitoringEvaluatingService.createMonitoringEvaluating(data).subscribe((resp:any)=>{
        // console.log(resp);
        this.monitorid = resp.id;
        // this.text_success = 'Goal created successfully!'
        Swal.fire('Created', ` Monitoring Evaluating Created successfully!`, 'success');
        this.ngOnInit();
      })
    }

   

  }


  

}
