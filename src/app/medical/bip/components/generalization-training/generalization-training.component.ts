import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { GoalFamilyEnvolmentService } from '../../service/goal-family-envolment.service';
import { GeneralizationTrainingService } from '../../service/generalization-training.service';

@Component({
  selector: 'app-generalization-training',
  templateUrl: './generalization-training.component.html',
  styleUrls: ['./generalization-training.component.scss']
})
export class GeneralizationTrainingComponent {
  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';

  public generalization: any;
  public risk_assestment: any;
  public discharge_plan: any;

  public phase: any;
  public description: any;

  public generalizations: any = [];
  public caregivers: any = [];
  
  public client_id: any;
  public user: any;
  public doctor_id: any;
  public client_selected: any;
  public patient_id: any;
  public bip_selected: any;
  public bip_selectedId: any;
  public bip_selectedIdd: any;
  public maladaptives: any;


  public generalizationTrainings: any;
  public client_id_generalizations: any;
  public generalizationTrainingid: any;
  public generalizationid: any;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public generalizationTrainingService:GeneralizationTrainingService,
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
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del goal
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
    this.generalizationTrainingService.getGeneralizationTrainingbyPatientId(patient_id).subscribe((resp:any)=>{
      // console.log('goals sustition by patientid',resp);
      this.generalizationTrainings = resp.generalizationTrainingPatientIds.data;
      this.generalizationTrainingid = resp.generalizationTrainingPatientIds.data[0].id;
      this.caregivers = resp.generalizationTrainingPatientIds.data[0].recomendation_lists;
      this.generalization = resp.generalizationTrainingPatientIds.data[0].generalization;
      this.risk_assestment = resp.generalizationTrainingPatientIds.data[0].risk_assestment;
      this.discharge_plan = resp.generalizationTrainingPatientIds.data[0].discharge_plan;
      this.generalizations = resp.generalizationTrainingPatientIds.data[0].transition_fading_plans;

      this.client_id_generalizations = resp.generalizationTrainingPatientIds.data[0].client_id;
      // this.goals = resp.goalReductionPatientIds;
      // console.log(this.goals);
      
      
    })
  }


  addDocument(){
    this.generalizations.push({
      phase: this.phase,
      description: this.description,
    })
    this.phase = '';
    this.description = '';
  }

  deleteDocument(i:any){
    this.generalizations.splice(i,1);
  }

  save(){
    this.text_validation = '';
    if(!this.discharge_plan || !this.generalizations ){
      this.text_validation = 'All Fields (*) are required';
      return;
    }

    let data ={
      id:this.generalizationTrainingid,
      bip_id: this.bip_selectedIdd,
      patient_id: this.patient_id,
      client_id: this.client_id,
      generalization: this.generalization,
      discharge_plan: this.discharge_plan,
      risk_assestment: this.risk_assestment,
      transition_fading_plans: this.generalizations,
    }

    if(this.client_id_generalizations && this.generalizationTrainingid){

      this.generalizationTrainingService.editGeneralizationTraining(data, this.generalizationTrainingid).subscribe((resp:any)=>{
        // console.log(resp);
        // this.text_success = 'Goal Updated'
        Swal.fire('Updated', `Generalization Training Updated successfully!`, 'success');
        this.ngOnInit();
      })
      
    }else{
      
      this.generalizationTrainingService.createGeneralizationTraining(data).subscribe((resp:any)=>{
        console.log(resp);
        this.generalizationid = resp.id;
        // this.text_success = 'Goal created successfully!'
        Swal.fire('Created', `Generalization Training Created successfully!`, 'success');
        this.ngOnInit();
      })
    }

   

  }
}
