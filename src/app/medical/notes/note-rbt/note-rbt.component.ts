import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { NoteRbtService } from '../services/note-rbt.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import Swal from 'sweetalert2';
import { url_media } from 'src/app/config/config';
import { Location } from '@angular/common';
declare var $:any;  
@Component({
  selector: 'app-note-rbt',
  templateUrl: './note-rbt.component.html',
  styleUrls: ['./note-rbt.component.scss']
})
export class NoteRbtComponent {
  public routes = routes;

  public url_media:any;
  valid_form:boolean = false;
  valid_form_success:boolean = false;

  public text_success:string = '';
  public text_validation:string = '';

  public selectedValueProvider!: string;
  public selectedValueRBT!: string;
  public selectedValueBCBA!: string;
  public selectedValueTimeIn: number = 0;
  public selectedValueTimeOut: number = 0;
  public selectedValueTimeIn2: number = 0;
  public selectedValueTimeOut2: number = 0;
  public selectedValueProviderName!: string;
  public selectedValueMaladaptive!: string;
  public selectedValueProviderCredential!: string;
  option_selected:number = 0;

  client_id:any;
  patient_id:any;
  doctor_id:any;
  patient_selected:any;
  client_selected:any;
  bip_id:any;
  user:any;
  
  public first_name:string = '';
  public last_name:string = '';
  public diagnosis_code:string = '';
  
  public provider_name_g:string = '';
  public provider_credential:string = '';
  public pos:string = '';
  public session_date:string = '';
  public time_in:string = '';
  public time_out:string = '';
  public time_in2:string = '';
  public time_out2:string = '';
  public session_length_total:string = '';
  public session_length_total2:string = '';
  public environmental_changes:string = '';
  
  public sumary_note:string = '';
  public meet_with_client_at:string = '';
  public client_appeared:string = '';
  public as_evidenced_by:string = '';
  public rbt_modeled_and_demonstrated_to_caregiver:string = '';
  public client_response_to_treatment_this_session:string = '';
  public progress_noted_this_session_compared_to_previous_session:string = '';
  public next_session_is_scheduled_for:string = '';
  public provider_name:string = '';
  public supervisor_name:string = '';

  public number_of_occurrences:number;
  public number_of_correct_responses:number;
  public total_trials:number;
  public number_of_correct_response:number;
  public maladaptive:string = '';
  public replacement:string = '';
  public interventions:any;
  public provider_signature:any;
  public supervisor_signature:any;
  
  
  public pairing:any;
  public response_block:any;
  public DRA:any;
  public DRO:any;
  public redirection:any;
  public errorless_teaching:any;
  public NCR:any;
  public shaping:any;
  public chaining:any;
  public token_economy:any;
  public extinction:any;
  public natural_teaching:any;

  public FILE_SIGNATURE_RBT:any;
  public IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED:any = 'assets/img/user-06.jpg';
  public FILE_SIGNATURE_BCBA:any;
  public IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED:any = 'assets/img/user-06.jpg';

  public rbt_id: any;
  public bcba_id: any;
  public maladaptivename: any;
  public replacementName: any;
  public note_rbt_id: any;
  public goal: any;
  public note_id: any;
  public porcentage_diario: any;

  public roles_rbt:any = [];
  public roles_bcba:any = [];

  public hours_days:any =[];
  public maladaptives:any =[];
  public replacementGoals:any =[];
  public intervention_added:any =[];
  public replacements:any =[];

  maladaptiveSelected:any =null;
  replacementSelected:any =null;
  maladp_added:any =[];
  replacement_added:any =[];
  maladaptive_behavior:any =null;
  electronic_signature:any ;
  doctor:any ;
  full_name:any ;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalService:GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public noteRbtService: NoteRbtService,
    public doctorService: DoctorService,
    public location: Location,
  ){}

  ngOnInit(): void {
    
    // window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.patient_id;
     })
     this.getConfig();
     this.getProfileBip();
    //  this.countValue();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;
    console.log(this.doctor_id);
    this.getDoctor();
    this.specialistData();

  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getDoctor(){
    this.doctorService.showDoctor(this.doctor_id).subscribe((resp:any)=>{
      this.doctor = resp.user;
      this.electronic_signature = resp.user.electronic_signature;
      this.full_name = resp.user.full_name;
    })
  }
  
  getConfig(){
    this.noteRbtService.listConfigNote().subscribe((resp:any)=>{
      console.log(resp);

      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.hours_days = resp.hours;
      this.selectedValueProviderCredential = resp.roles_rbt.certificate_number;
      
    })
  }

  getProfileBip(){
    this.bipService.showBipProfile(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.client_selected = resp;

      this.first_name = this.client_selected.patient.first_name;
      this.last_name = this.client_selected.patient.last_name;
      this.patient_id = resp.patient.patient_id;
      this.selectedValueProviderName = resp.patient.rbt_id;
      this.selectedValueRBT = resp.patient.rbt_id;
      this.selectedValueBCBA = resp.patient.bcba_id;
      this.pos = JSON.parse(resp.patient.pos_covered) ;
      
      console.log( this.pos);  
      this.diagnosis_code = this.client_selected.patient.diagnosis_code;  
      this.getMaladaptivesBipByPatientId();
      this.getReplacementsByPatientId();
    });
  }

  getMaladaptivesBipByPatientId(){
    this.bipService.getBipProfilePatient_id(this.patient_id).subscribe((resp:any)=>{
      console.log(resp);
      this.maladaptives = resp.maladaptives;
      this.bip_id = resp.id;
    })
  }
  getReplacementsByPatientId(){
    this.noteRbtService.showReplacementbyPatient(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.replacementGoals = resp.replacementGoals;
    })
  }

  specialistData(){
    this.doctorService.showDoctorProfile(this.doctor_id).subscribe((resp:any)=>{
      console.log(resp);
      this.provider_credential = resp.doctor.certificate_number;
      // this.notes = resp.notes;
      // this.services = resp.services;
    })
  }

  // selectSpecialist(event:any){
  //   event = this.selectedValueProviderName;
  //   this.specialistData(this.selectedValueProviderName);
  //   console.log(this.selectedValueProviderName);
    
  // }

  speciaFirmaDataRbt(selectedValueRBT){
    this.doctorService.showDoctorProfile(selectedValueRBT).subscribe((resp:any)=>{
      console.log(resp);
      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED = resp.doctor.electronic_signature;
      console.log(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
      // this.notes = resp.notes;
      // this.services = resp.services;
    })
  }
  selectFirmaSpecialistRbt(event:any){
    event = this.selectedValueRBT;
    this.speciaFirmaDataRbt(this.selectedValueRBT);
    console.log(this.selectedValueRBT);
    
  }
  
  speciaFirmaDataBcba(selectedValueBCBA){
    this.doctorService.showDoctorProfile(selectedValueBCBA).subscribe((resp:any)=>{
      console.log(resp);
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED = resp.doctor.electronic_signature;
      console.log(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
      // this.notes = resp.notes;
      // this.services = resp.services;
    })
  }

  selectFirmaSpecialistBcba(event:any){
    event = this.selectedValueBCBA;
    this.speciaFirmaDataBcba(this.selectedValueBCBA);
    console.log(this.selectedValueBCBA);
    
  }
  
 

  hourTimeInSelected(value:number){
    this.selectedValueTimeIn = value;
    // console.log(value);
  }
  hourTimeOutSelected(value:number){
    this.selectedValueTimeOut = value;
    // console.log(value);

  }

  selectMaladaptive(behavior:any){
    this.maladaptiveSelected = behavior;
    // console.log(behavior);
    // this.maladp_added.push({
    //   maladaptive : behavior
    // })
  }

  selectReplacement(replacemen:any){
    this.replacementSelected = replacemen;
    // console.log(this.replacementSelected);
    // this.replacement_added.push({
    //   replacement : replacemen
    // })
  }

  back(){
    this.replacementSelected = null;
    this.maladaptiveSelected = null;
    this.total_trials = null;
    this.number_of_correct_response = null;
    // this.ngOnInit();
  }

  
  addMaladaptive(behavior, i){
    this.maladaptiveSelected = behavior;
    this.maladaptives[i]= behavior
    
    this.maladaptiveSelected = null;
    this.maladaptive_behavior = '';
    this.number_of_occurrences = null;
    
  }

 
  addReplacement(replacemen){
    
    this.replacementSelected = replacemen;
    this.replacementGoals.push({
      goal: this.replacementSelected.goal,
      total_trials: this.replacementSelected.total_trials,
      number_of_correct_response: this.replacementSelected.number_of_correct_response ,
      // number_of_correct_response: this.number_of_correct_response ? this.number_of_correct_response :0 ,
      
    })
    if(this.replacementGoals.length > 1){
      this.replacementGoals.splice(this.replacementGoals,1);
    }
    this.replacementSelected = null;
    this.goal = '';
    this.total_trials = null;
    this.number_of_correct_response = null;

    
  }

  // addReplacement(replacemen:any){
    
  //   if(this.replacementSelected !== null ){
  //     this.total_trials = 0;
  //   this.number_of_correct_response = 0;
  //   this.replacementGoals.push({
  //     goal: this.replacementSelected.goal,
  //     total_trials: this.total_trials ? this.total_trials  : "0",
  //     number_of_correct_response: this.number_of_correct_response ? this.number_of_correct_response : '0' ,
      
  //   })
  //   if(this.replacementGoals.length > 1){
  //     this.replacementGoals.splice(this.replacementGoals,1);
  //   }
  //   this.replacementSelected = replacemen.goal;
  //   this.goal = '';
  //   this.total_trials = 0;
  //   this.number_of_correct_response = 0;
  //   }else{
  //     // alert("if you didn't have any reaction, enter :0");
  //     this.goal = replacemen.goal;
  //     this.total_trials = 0;
  //     this.number_of_correct_response = 0;

  //     this.replacementGoals.push({
  //       goal: replacemen.goal,
  //       total_trials:  "0",
  //       number_of_correct_response:  '0' ,
      
  //     })
  //     if(this.replacementGoals.length > 1){
  //       this.replacementGoals.splice(this.replacementGoals,1);
  //     }
  //     }

    
  // }


  deleteMaladaptive(i:any){
    this.replacementGoals.splice(i,1);
  }


  

  addInterventions(){
    
    this.intervention_added.push({
      pairing: this.pairing,
      response_block: this.response_block,
      DRA: this.DRA,
      DRO: this.DRO,
      redirection: this.redirection,
      errorless_teaching: this.errorless_teaching,
      NCR: this.NCR,
      shaping: this.shaping,
      chaining: this.chaining,
      token_economy: this.token_economy,
      extinction: this.extinction,
      natural_teaching: this.natural_teaching,
    })
     //si existe un elemento actualiza ese elemento en la lista
    if(this.intervention_added.length > 1){
      this.intervention_added.splice(this.intervention_added,1);
    }
    Swal.fire('Updated', ` Interventions Added`, 'success');
  }

  //funcion para la primera imagen.. funciona
  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_RBT = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_SIGNATURE_RBT);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED = reader.result;
  }

  loadFileSignature($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_BCBA = $event.target.files[0];
    let reader2 = new FileReader();
    reader2.readAsDataURL(this.FILE_SIGNATURE_BCBA);
    reader2.onloadend = ()=> this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED = reader2.result;
  }

  

  countValue(){
    const countElement = document.querySelector('.count') as HTMLInputElement;
    countElement.disabled = true;
  
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('plus')) {
        countElement.value = (parseInt(countElement.value, 10) + 1).toString();
      } else if (target.classList.contains('minus')) {
        let currentValue = parseInt(countElement.value, 10);
        if (currentValue === 0) {
          currentValue = 1;
        } else {
          currentValue -= 1;
        }
        countElement.value = currentValue.toString();
      }
    });
  }

  
  save(){
    this.text_validation = '';
    if(!this.replacementGoals||!this.maladaptives ||!this.provider_credential 
      || !this.supervisor_name
    ){
      this.text_validation = 'All Fields (*) are required';
      return;
    }

    


    let formData = new FormData();
    formData.append('patient_id', this.patient_id);
    formData.append('doctor_id', this.doctor_id);
    formData.append('bip_id', this.bip_id);
    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('provider_credential', this.provider_credential);
    formData.append('pos', this.pos);
    formData.append('session_date', this.session_date);

    
    
    // formData.append('provider_name_g', this.selectedValueProviderName);
    // formData.append('provider_name', this.selectedValueRBT);
    formData.append('provider_name_g', this.doctor_id);
    formData.append('provider_name', this.doctor_id);
    formData.append('supervisor_name', this.selectedValueBCBA);
    

    if(this.selectedValueTimeIn ){
      formData.append('time_in', this.selectedValueTimeIn+'' ? this.selectedValueTimeIn+'' : "0");
    }
    if(this.selectedValueTimeOut ){
      formData.append('time_out', this.selectedValueTimeOut+''? this.selectedValueTimeOut+'' : "0");
    }
    if(this.selectedValueTimeIn2 ){
      formData.append('time_in2', this.selectedValueTimeIn2+''? this.selectedValueTimeIn2+'' : "0");
    }
    if(this.selectedValueTimeOut2 ){
      formData.append('time_out2', this.selectedValueTimeOut2+''? this.selectedValueTimeOut2+'' : "0");
    }
    formData.append('environmental_changes', this.environmental_changes);
    

    

    formData.append('replacements', JSON.stringify(this.replacementGoals));
    formData.append('maladaptives', JSON.stringify(this.maladaptives));
    formData.append('interventions', JSON.stringify(this.intervention_added));

    formData.append('meet_with_client_at', this.meet_with_client_at);
    formData.append('client_appeared', this.client_appeared);
    formData.append('as_evidenced_by', this.as_evidenced_by);
    formData.append('client_response_to_treatment_this_session', this.client_response_to_treatment_this_session);
    formData.append('rbt_modeled_and_demonstrated_to_caregiver', this.rbt_modeled_and_demonstrated_to_caregiver);
    formData.append('progress_noted_this_session_compared_to_previous_session', this.progress_noted_this_session_compared_to_previous_session);
    
    if(this.next_session_is_scheduled_for){
      formData.append('next_session_is_scheduled_for', this.next_session_is_scheduled_for);
    }
    // formData.append('next_session_is_scheduled_for', this.next_session_is_scheduled_for);
    // formData.append('porcentage_diario', this.number_of_correct_response * 100 / this.total_trials,);
    
    // formData.append('imagen', this.FILE_SIGNATURE_RBT  );
    // formData.append('imagen', this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
    // formData.append('imagenn', this.FILE_SIGNATURE_BCBA);
    // formData.append('imagenn', this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
    if(this.FILE_SIGNATURE_RBT ){
      formData.append('imagen', this.FILE_SIGNATURE_RBT);
    }
    // if(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED ){
      //   formData.append('provider_signature', this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
      // }
    formData.append('provider_signature', this.doctor.electronic_signature);
    
    if(this.FILE_SIGNATURE_RBT ){
      formData.append('imagenn', this.FILE_SIGNATURE_RBT);
    }
    if(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED ){
      formData.append('supervisor_signature', this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
    }
    
    this.noteRbtService.createNote(formData).subscribe((resp:any)=>{
      // console.log(resp);
      
      if(resp.message == 403){
        this.text_validation = resp.message_text;
        Swal.fire('Warning', resp.message_text, 'warning');
      }else{
        this.text_success = 'Employer created';
        // this.ngOnInit();
        Swal.fire('Created', ` Note Rbt Created`, 'success');
        this.router.navigate(['/note-rbt/listbyclient/',this.patient_id]);
      }
    })


  }


//   class Calculadora {
//     sumar(num1, num2) {
//         return num1 + num2;
//     }


//     restar(num1, num2) {
//         return num1 - num2;
//     }


//     dividir(num1, num2) {
//         return num1 / num2;
//     }


//     multiplicar(num1, num2) {
//         return num1 * num2;
//     }
// }
}
