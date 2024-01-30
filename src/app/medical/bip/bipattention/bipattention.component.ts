import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { BipService } from '../service/bip.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { GoalService } from '../service/goal.service';

@Component({
  selector: 'app-bipattention',
  templateUrl: './bipattention.component.html',
  styleUrls: ['./bipattention.component.scss']
})
export class BipattentionComponent {
  public routes = routes;

  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';
  option_selected:number = 1;

  
  first_name:string = '';
  last_name:string = '';
  phone:string = '';
  parent_guardian_name:string = '';
  relationship:string = '';
  address:string = '';
  age:number = 0;
  dob:string = '';

  public medical:any = [];
  description:any;
  name_medical:any;
  uso:any;
  
  client_id:any;
  patient_id:any;
  type_of_assessment:any;
  background_information:any;
  client_selected:any;
  bip_selected:any;
  previus_treatment_and_result:any;
  current_treatment_and_progress:any;
  education_status:any;
  phisical_and_medical_status:any;

  assestment_conducted:any;
  assestment_conducted_options:any;

  // prevalent_setting_event_and_atecedents:any;
  // behavior:any;
  // hypothesized_functions:any;

  
  reduction:any = [];
  maladaptive:any = [];

  
  public documents:any = [];
  public doctor_referal: any;
  public medical_notes: any;
  public cde: any;
  public iep: any;
  public mnl: any;
  public referal: any;
  
  //maladaptives
  
  public maladaptives:any = [];
  public title: any;
  public definition: any;
  public unit_malad: any;
  
  public assesstmentsOptions:any = [];
  public functional_assessment_interview_completed: any;
  public vineland_behavior_rating_scale: any;
  public ados: any;

  public prevalent_setting_event_and_atecedents: any = [];
  public prevalent_setting_event_and_atecedent: any;
  public behavior: any;
  public hypothesized_functions: any;
  
  public interventions:any = [];
  pairing:any;
  premack_principal:any;
  response_block:any;
  dro:any;
  dra:any;
  errorless_teaching:any;
  redirection:any;
  ncr:any;
  shaping:any;
  chaining:any;
  

  patient_selected:any;
  bip_id:any;



  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalService:GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    
    window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.client_id = resp.id;
      this.patient_id= resp.id
      console.log(this.client_id);
     })
     this.getProfileBip();
    // this.getBip();
    //  this.getConfig();
    this.ativatedRoute.params.subscribe( ({id}) => this.getBip(id));
    
  }

  optionSelected(value:number){
    this.option_selected = value;
  }

  getConfig(){
    // this.bipService.listConfig().subscribe((resp:any)=>{
    //   console.log(resp);
    //   this.documents_name = resp.documents.name;
    //   // this.documents_name = resp.documents_recev;
    // })
  }
  
//listados
  getProfileBip(){
    this.bipService.showBipProfile(this.client_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp;

      this.first_name = this.client_selected.patient.first_name;
      this.last_name = this.client_selected.patient.last_name;
      this.patient_id = this.client_selected.patient.patient_id;  
      this.phone = this.client_selected.patient.phone; 
      this.parent_guardian_name = this.client_selected.patient.parent_guardian_name;
      this.relationship = this.client_selected.patient.relationship;
      this.address = this.client_selected.patient.address;
      this.age = this.client_selected.patient.age;
      this.dob = this.client_selected.patient.dob;

    });
    // bip


  }
  getBip(id){
    if (id !== null && id !== undefined) {
      this.bipService.getBipByUser(+id).subscribe((resp:any)=>{
        console.log(resp);
  
        this.bip_selected = resp.bip;
        
        this.type_of_assessment =this.bip_selected.type_of_assessment;
  
        this.background_information = this.bip_selected.background_information,
        this.previus_treatment_and_result = this.bip_selected.previus_treatment_and_result,
        this.current_treatment_and_progress = this.bip_selected.current_treatment_and_progress,
        this.education_status = this.bip_selected.education_status,
        this.phisical_and_medical_status = this.bip_selected.phisical_and_medical_status,
        this.assestment_conducted = this.bip_selected.assestment_conducted,
        
        this.documents =this.bip_selected.documents;
        this.maladaptives =this.bip_selected.maladaptives;
        this.assestment_conducted_options =this.bip_selected.assestment_conducted_options;
        this.prevalent_setting_event_and_atecedents =this.bip_selected.prevalent_setting_event_and_atecedents;
        this.interventions =this.bip_selected.interventions;
  
      })
    }
    
    
  }

  addService(){
    this.documents.push({
      doctor_referal: this.doctor_referal,
      medical_notes: this.medical_notes,
      cde: this.cde,
      iep: this.iep,
      mnl: this.mnl,
      referal: this.referal,
    })
    if(this.documents.length > 1){
      this.documents.splice(this.documents,1);
    }
  }

  deleteService(i:any){
    this.documents.splice(i,1);
  }

  addMaladaptive(){
    this.maladaptives.push({
      title: this.title,
      definition: this.definition,
      unit_malad: this.unit_malad,
    })
    this.title = '';
    this.definition = '';
    this.unit_malad = '';
  }

  deleteMaladaptive(i:any){
    this.maladaptives.splice(i,1);
  }

  addAssesstmentOption(){
    this.assesstmentsOptions.push({
      functional_assessment_interview_completed: this.functional_assessment_interview_completed,
      vineland_behavior_rating_scale: this.vineland_behavior_rating_scale,
      ados: this.ados,
    })
    if(this.assesstmentsOptions.length > 1){
      this.assesstmentsOptions.splice(this.assesstmentsOptions,1);
    }
  }

  deleteAssesstmentOption(i:any){
    this.assesstmentsOptions.splice(i,1);
  }
  addAssesstment(){
    this.prevalent_setting_event_and_atecedents.push({
      prevalent_setting_event_and_atecedent: this.prevalent_setting_event_and_atecedent,
      behavior: this.behavior,
      hypothesized_functions: this.hypothesized_functions,
    })
    this.prevalent_setting_event_and_atecedent = '';
    this.behavior = '';
    this.hypothesized_functions = '';
  }

  deleteAssesstment(i:any){
    this.prevalent_setting_event_and_atecedents.splice(i,1);
  }
  addIntervention(){
    this.interventions.push({
      pairing: this.pairing,
      premack_principal: this.premack_principal,
      response_block: this.response_block,
      dro: this.dro,
      dra: this.dra,
      errorless_teaching: this.errorless_teaching,
      redirection: this.redirection,
      ncr: this.ncr,
      shaping: this.shaping,
      chaining: this.chaining,
    })
    this.pairing = '';
    this.premack_principal = '';
    this.response_block = '';
    this.dro = '';
    this.dra = '';
    this.errorless_teaching = '';
    this.redirection = '';
    this.ncr = '';
    this.shaping = '';
    this.chaining = '';
  }

  deleteIntervention(i:any){
    this.interventions.splice(i,1);
  }
  
//fin listados


  save(){debugger
    this.text_validation = '';
    // if(!this.documents || this.documents.length == 0){
    //   this.text_validation = 'Es requerido ingresar el diagnostico y una receta medica';
    //   return;
    // }

    let data ={
      client_id: this.client_selected.patient.id,
      // patient_id: this.client_selected.patient_id,
      
      type_of_assessment: this.type_of_assessment,
      background_information: this.background_information,
      previus_treatment_and_result: this.previus_treatment_and_result,
      current_treatment_and_progress: this.current_treatment_and_progress,
      education_status: this.education_status,
      phisical_and_medical_status: this.phisical_and_medical_status,
      assestment_conducted: this.assestment_conducted,

      documents_reviewed: this.documents,
      maladaptives: this.maladaptives,
      assesstmentsOptions  : this.assesstmentsOptions,
      prevalent_setting_event_and_atecedents: this.prevalent_setting_event_and_atecedents,
      interventions: this.interventions,
    }

    if(this.client_id !== null && this.client_id !== undefined){
      this.bipService.createBip(data).subscribe((resp:any)=>{
        console.log(resp);
        this.text_success = 'Se guardó la informacion de la cita médica'
        this.ngOnInit();
      })
      
      // if(this.bip_selected.client_id !== this.client_id){
      //   //actualizar
        
  
        
      // }
    }else{
      this.bipService.update(data, this.bip_selected.client_id).subscribe((resp:any)=>{
        console.log(resp);
        this.text_success = 'Bip Updated'
        this.ngOnInit();
      })
      //crear
    }
    
    return false;
    

  }

//fin bip

  //goals
  getGoal(){
    this.goalService.showGoalProfile(this.client_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp;

      this.first_name = this.client_selected.patient.first_name;
      this.last_name = this.client_selected.patient.last_name;
      this.client_id = this.client_selected.patient.client_id;  
      this.phone = this.client_selected.patient.phone; 
      this.parent_guardian_name = this.client_selected.patient.parent_guardian_name;
      this.relationship = this.client_selected.patient.relationship;
      this.address = this.client_selected.patient.address;
      this.age = this.client_selected.patient.age;
      this.dob = this.client_selected.patient.dob;

    });
    // cita medica

    // this.bipService.showCitamedica(this.client_id).subscribe((resp:any)=>{
    //   // console.log(resp);

    //   this.appointment_atention_selected = resp.appointment_attention;
    //   this.medical =this.appointment_atention_selected.receta_medica;
    //   this.description =this.appointment_atention_selected.description;


    // })

  }
  saveGoal(){
    this.text_validation = '';
    if(!this.description || this.medical.length == 0){
      this.text_validation = 'Es requerido ingresar el diagnostico y una receta medica';
      return;
    }

    let data ={
      client_id: this.client_id,
      description: this.description,
      medical: this.medical,
      patient_id: this.client_selected.patient_id,
      
      documents_reviewed: this.client_selected.documents_reviewed,
      background_information: this.client_selected.background_information,
      previus_treatment_and_result: this.client_selected.previus_treatment_and_result,
      current_treatment_and_progress: this.client_selected.current_treatment_and_progress,
      education_status: this.client_selected.education_status,
      phisical_and_medical_status: this.client_selected.phisical_and_medical_status,
      maladaptives: this.client_selected.maladaptives,
      assestment_conducted: this.client_selected.assestment_conducted,
      assesstmentsOptions: this.client_selected.assestment_conducted_options,
      assesstments: this.client_selected.prevalent_setting_event_and_atecedents,
      interventions: this.client_selected.interventions,
    }

    this.bipService.createBip(data).subscribe((resp:any)=>{
      // console.log(resp);
      this.text_success = 'Se guardó la informacion de la cita médica'
    })

  }

  //fin goals

}
