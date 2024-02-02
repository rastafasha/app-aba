import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BipService } from 'src/app/medical/bip/service/bip.service';
import { GoalService } from 'src/app/medical/bip/service/goal.service';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-bipform',
  templateUrl: './bipform.component.html',
  styleUrls: ['./bipform.component.scss']
})
export class BipformComponent {

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
  id:any;
  patient_id:any;
  doctor_id:any;
  user:any;

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
  public document_title: any;
  public document_status: any;
  
  //maladaptives
  
  public maladaptives:any = [];

  public maladaptive_behavior: any;
  public topografical_definition: any;
  public baseline_level: any;
  public initial_interesting: any;
  
  
  //assestments
  public assesstments:any = [];
  public assesstmentsDocuments:any = [];
  public assestment_title: any;
  public assestment_status: any;
  
  // public functional_assessment_interview_completed: any;
  // public vineland_behavior_rating_scale: any;
  // public ados: any;

  //
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
  
  inteventionSelected:any;


  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    
    window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.client_id = resp.id;
      this.patient_id= resp.id
      // console.log(this.client_id);
     })
     this.getProfileBip();
     
    this.ativatedRoute.params.subscribe( ({id}) => this.getBip(id));
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;

    // if(this.option_selected == '2'){
    // }
    
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
  
  getProfileBip(){
    this.bipService.showBipProfile(this.client_id).subscribe((resp:any)=>{
      // console.log(resp);
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
        // console.log(resp);
  
        this.bip_selected = resp;
        this.id = resp.id;
        
        this.type_of_assessment =this.bip_selected.type_of_assessment;
  
        this.background_information = this.bip_selected.bip.background_information,
        this.previus_treatment_and_result = this.bip_selected.bip.previus_treatment_and_result,
        this.current_treatment_and_progress = this.bip_selected.bip.current_treatment_and_progress,
        this.education_status = this.bip_selected.bip.education_status,
        this.phisical_and_medical_status = this.bip_selected.bip.phisical_and_medical_status,
        this.assestment_conducted = this.bip_selected.bip.assestment_conducted,
        
        this.documents =this.bip_selected.documents_reviewed;
        this.maladaptives =this.bip_selected.maladaptives;
        this.maladaptive_behavior =this.bip_selected.maladaptives[0].title;
        // console.log(this.maladaptives);
        // console.log(this.maladaptive_behavior);

        this.assesstments =this.bip_selected.assestment_conducted_options;
        this.assesstmentsDocuments =this.bip_selected.assestment_conducted_options;
        this.prevalent_setting_event_and_atecedents =this.bip_selected.prevalent_setting_event_and_atecedents;
        this.interventions =this.bip_selected.interventions;
  
      })
    }
    
    
  }
//listados

  addDocument(){
    this.documents.push({
      document_title: this.document_title,
      document_status: this.document_status,
    })
    this.document_title = '';
    this.document_status = '';
  }

  deleteDocument(i:any){
    this.documents.splice(i,1);
  }

  addMaladaptive(){
    this.maladaptives.push({
      maladaptive_behavior: this.maladaptive_behavior,
      topografical_definition: this.topografical_definition,
      baseline_level: this.baseline_level,
      initial_interesting: this.initial_interesting,
    })
    this.maladaptive_behavior = '';
    this.topografical_definition = '';
    this.baseline_level = '';
    this.initial_interesting = '';
  }

  deleteMaladaptive(i:any){
    this.maladaptives.splice(i,1);
    // this.ngOnInit();
  }

  // addAssesstmentOption(){
  //   this.assesstments.push({
  //     assestment_title: this.assestment_title,
  //     assestment_status: this.assestment_status,
  //   })
  //   if(this.assesstments.length > 1){
  //     this.assesstments.splice(this.assesstments,1);
  //   }
  // }

  // deleteAssesstmentOption(i:any){
  //   this.assesstments.splice(i,1);
  // }

  addAssesstmentDocument(){debugger
    this.assesstmentsDocuments.push({
      assestment_title: this.assestment_title,
      assestment_status: this.assestment_status,
    })
    this.assestment_title = '';
    this.assestment_status = '';
  }

  deleteAssesstmentDocument(i:any){
    this.assesstmentsDocuments.splice(i,1);
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


  save(){
    this.text_validation = '';
    // if(!this.documents || this.documents.length == 0){
    //   this.text_validation = 'Es requerido ingresar el diagnostico y una receta medica';
    //   return;
    // }

    let data ={
      id:this.id,
      client_id: this.client_selected.patient.id,
      patient_id: this.patient_id,
      doctor_id: this.doctor_id,
      
      type_of_assessment: this.type_of_assessment,
      background_information: this.background_information,
      previus_treatment_and_result: this.previus_treatment_and_result,
      current_treatment_and_progress: this.current_treatment_and_progress,
      education_status: this.education_status,
      phisical_and_medical_status: this.phisical_and_medical_status,
      assestment_conducted: this.assestment_conducted,

      documents_reviewed: this.documents,
      maladaptives: this.maladaptives,
      assestment_conducted_options  : this.assesstmentsDocuments,
      prevalent_setting_event_and_atecedents: this.prevalent_setting_event_and_atecedents,
      interventions: this.interventions,
    }

    if(this.bip_selected){

      this.bipService.update(data, this.id).subscribe((resp:any)=>{
        // console.log(resp);
        this.text_success = 'Bip Updated'
        this.ngOnInit();
      })
      
    }else{
      
      //crear
      this.bipService.createBip(data).subscribe((resp:any)=>{
        // console.log(resp);
        this.text_success = 'Se guardó la informacion de la cita médica'
        this.ngOnInit();
      })
    }
    
    return false;
    

  }

  selectedIntervention(intervention:any){
    this.inteventionSelected = intervention
    // console.log(this.inteventionSelected);
  }

  
}
