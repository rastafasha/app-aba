import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { GoalFamilyEnvolmentService } from '../../service/goal-family-envolment.service';

@Component({
  selector: 'app-family-involvement-goal-form',
  templateUrl: './family-involvement-goal-form.component.html',
  styleUrls: ['./family-involvement-goal-form.component.scss']
})
export class FamilyInvolvementGoalFormComponent {

  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';

  
  public caregiver_goal: any;
  public outcome_measure: any;
  public criteria: any;
  public initiation: Date;
  public current_status: any;
  public caregivers_training_goals: any = [];
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


  public goalFamilyEnvolments: any;
  public client_id_goalFamilyEnvolments: any;
  public goalFamilyEnvolmentid: any;
  public goalFamilyid: any;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalFamilyEnvolmentService:GoalFamilyEnvolmentService,
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
    
    
    this.getBip(); // se solicita la info del perfil del bip
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
    this.goalFamilyEnvolmentService.getGoalFamilyEnvolmentbyPatientId(patient_id).subscribe((resp:any)=>{
      // console.log('goals sustition by patientid',resp);
      this.goalFamilyEnvolments = resp.familiEnvolmentPatientIds.data;
      this.goalFamilyEnvolmentid = resp.familiEnvolmentPatientIds.data[0].id;
      this.caregivers = resp.familiEnvolmentPatientIds.data[0].caregivers_training_goals;
      // this.client_id_goalFamilyEnvolments = resp.familiEnvolmentPatientIds.data[0].caregivers_training_goals.client_id;
      this.client_id_goalFamilyEnvolments = resp.familiEnvolmentPatientIds.data[0].client_id;
      // this.goals = resp.goalReductionPatientIds;
      // console.log(this.goals);
      
      
    })
  }


  addDocument(){debugger
    this.caregivers.push({
      caregiver_goal: this.caregiver_goal,
      outcome_measure: this.outcome_measure,
      criteria: this.criteria,
      initiation: this.initiation,
      current_status: this.current_status,
    })
    this.caregiver_goal = '';
    this.outcome_measure = '';
    this.criteria = '';
    this.initiation = null;
    this.current_status = '';
  }

  deleteDocument(i:any){
    this.caregivers.splice(i,1);
  }

  save(){
    this.text_validation = '';
    // if(!this.maladaptive || !this.current_sustitution || !this.golsto){
    //   this.text_validation = 'Is required this information ';
    //   return;
    // }

    let data ={
      id:this.goalFamilyEnvolmentid,
      bip_id: this.bip_selectedIdd,
      patient_id: this.patient_id,
      client_id: this.client_id,
      caregivers_training_goals: this.caregivers,
    }

    if(this.client_id_goalFamilyEnvolments && this.goalFamilyEnvolmentid){

      this.goalFamilyEnvolmentService.editGoalFamilyEnvolment(data, this.goalFamilyEnvolmentid).subscribe((resp:any)=>{
        // console.log(resp);
        // this.text_success = 'Goal Updated'
        Swal.fire('Updated', `Goal Sustitution Updated successfully!`, 'success');
        this.ngOnInit();
      })
      
    }else{
      
      this.goalFamilyEnvolmentService.createGoalFamilyEnvolment(data).subscribe((resp:any)=>{
        // console.log(resp);
        this.goalFamilyid = resp.id;
        // this.text_success = 'Goal created successfully!'
        Swal.fire('Created', `Goal Sustitution Created successfully!`, 'success');
        this.ngOnInit();
      })
    }

   

  }
}
