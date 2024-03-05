import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { NoteRbtService } from '../services/note-rbt.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-note-rbt',
  templateUrl: './edit-note-rbt.component.html',
  styleUrls: ['./edit-note-rbt.component.scss']
})
export class EditNoteRbtComponent {
  public routes = routes;

  valid_form:boolean = false;
  valid_form_success:boolean = false;

  public text_success:string = '';
  public text_validation:string = '';

  public selectedValueProvider!: string;
  public selectedValueRBT!: string;
  public selectedValueBCBA!: string;
  public selectedValueTimeIn!: number;
  public selectedValueTimeOut!: number;
  public selectedValueTimeIn2!: number;
  public selectedValueTimeOut2!: number;
  public selectedValueProviderName!: string;
  public selectedValueMaladaptive!: string;
  option_selected:number = 0;

  client_id:any;
  patient_id:any;
  doctor_id:any;
  patient_selected:any;
  client_selected:any;
  note_selected:any;
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

  public number_of_occurrences:number = 0;
  public number_of_correct_responses:number = 0;
  public total_trials:number = 0;
  public number_of_correct_response:number = 0;
  public maladaptive:string = '';
  public replacement:string = '';
  public maladaptive_behavior:string = '';
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
  public note_selectedId: any;

  public roles_rbt:any = [];
  public roles_bcba:any = [];

  public hours_days:any =[];
  public maladaptives:any =[];
  public replacementGoals:any =[];
  public intervention_added:any =[];
  public replacements:any =[];
  public interventionsgroup:any =[];

  public maladaptivegroup:any =[];
  public replacementgroup:any =[];

  maladaptiveSelected:any =null;
  replacementSelected:any =null;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalService:GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public noteRbtService: NoteRbtService,
    public doctorService: DoctorService,
  ){}

  ngOnInit(): void {
    
    // window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.note_id = resp.id;
     })
     this.getConfig();
     this.getNote();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;
  }

 
  getConfig(){
    this.noteRbtService.listConfigNote().subscribe((resp:any)=>{
      console.log(resp);

      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.hours_days = resp.hours;
      
    })
  }

  getNote(){
    this.noteRbtService.getNote(this.note_id).subscribe((resp:any)=>{
      console.log(resp);
      this.note_selected = resp.noteRbt;
      this.note_selectedId = resp.noteRbt.id;
      this.patient_id = this.note_selected.patient_id;
      this.bip_id = this.note_selected.bip_id;

      this.provider_credential = this.note_selected.provider_credential;
      this.as_evidenced_by = this.note_selected.as_evidenced_by;
      this.client_appeared = this.note_selected.client_appeared;
      this.client_response_to_treatment_this_session = this.note_selected.client_response_to_treatment_this_session;
      
      this.interventions = resp.interventions;
      let jsonObj = JSON.parse(this.interventions) || '';
      this.interventionsgroup = jsonObj;
      console.log(this.interventionsgroup);

      this.pairing = this.interventionsgroup[0].pairing;
      this.response_block = this.interventionsgroup[0].response_block;
      this.DRA = this.interventionsgroup[0].DRA;
      this.DRO = this.interventionsgroup[0].DRO;
      this.redirection = this.interventionsgroup[0].redirection;
      this.errorless_teaching = this.interventionsgroup[0].errorless_teaching;
      this.NCR = this.interventionsgroup[0].NCR;
      this.shaping = this.interventionsgroup[0].shaping;
      this.chaining = this.interventionsgroup[0].chaining;
      this.token_economy = this.interventionsgroup[0].token_economy;
      this.extinction = this.interventionsgroup[0].extinction;
      this.natural_teaching = this.interventionsgroup[0].natural_teaching;

      
      this.maladaptive = resp.maladaptives;
      let jsonObj1 = JSON.parse(this.maladaptive) || '';
      this.maladaptivegroup = jsonObj1;
      // console.log(this.maladaptivegroup);

      this.replacement = resp.replacements;// ?
      let jsonObj2 = JSON.parse(this.replacement) || '';
      this.replacementgroup = jsonObj2;
      // console.log(this.replacementgroup);

      this.pos = this.note_selected.pos;
      this.environmental_changes = this.note_selected.environmental_changes;
      this.meet_with_client_at = this.note_selected.meet_with_client_at;
      this.progress_noted_this_session_compared_to_previous_session = this.note_selected.progress_noted_this_session_compared_to_previous_session;
      
      this.rbt_modeled_and_demonstrated_to_caregiver = this.note_selected.rbt_modeled_and_demonstrated_to_caregiver;
      this.replacement = this.note_selected.replacement;
      
      // this.session_date = this.note_selected.session_date;
      this.session_date = this.note_selected.session_date? new Date(this.note_selected.session_date).toISOString(): '';
      // this.next_session_is_scheduled_for = this.note_selected.next_session_is_scheduled_for;
      this.next_session_is_scheduled_for = this.note_selected.next_session_is_scheduled_for? new Date(this.note_selected.next_session_is_scheduled_for).toISOString(): '';
      
      this.session_length_total = this.note_selected.session_length_total;
      this.session_length_total2 = this.note_selected.session_length_total2;
      
      this.selectedValueTimeIn = this.note_selected.time_in;
      console.log(this.selectedValueTimeIn);
      this.selectedValueTimeOut = this.note_selected.time_in2;
      this.selectedValueTimeIn2 = this.note_selected.time_out;
      this.selectedValueTimeOut2 = this.note_selected.time_out2;

      this.selectedValueProviderName = this.note_selected.provider_name_g;
      this.selectedValueRBT = this.note_selected.provider_name;
      this.selectedValueBCBA = this.note_selected.supervisor_name;

      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED = this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED = this.note_selected.supervisor_signature;

      this.getProfileBip();
    })
  }

  getProfileBip(){
    this.bipService.getBipProfilePatient_id(this.patient_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp;

      this.first_name = this.client_selected.patient.first_name;
      this.last_name = this.client_selected.patient.last_name;
      this.patient_id = resp.patient.patient_id;
      this.pos = resp.patient.pos_covered;
      this.selectedValueProviderName = resp.patient.rbt_id;
      this.selectedValueRBT = resp.patient.rbt_id;
      this.selectedValueBCBA = resp.patient.bcba_id;
      // console.log(this.patient_id);  
      this.diagnosis_code = this.client_selected.patient.diagnosis_code;  
      
    });
  }

  


  specialistData(selectedValueInsurer){
    this.doctorService.showDoctorProfile(selectedValueInsurer).subscribe((resp:any)=>{
      console.log(resp);
      this.provider_credential = resp.doctor.certificate_number;
      // this.notes = resp.notes;
      // this.services = resp.services;
    })
  }

  selectSpecialist(event:any){
    event = this.selectedValueProviderName;
    this.specialistData(this.selectedValueProviderName);
    
  }
 

  hourTimeInSelected(value:number){
    this.selectedValueTimeIn = value;
    console.log(value);
  }
  hourTimeOutSelected(value:number){
    this.selectedValueTimeOut = value;
    console.log(value);

  }

  selectMaladaptive(behavior:any){
    this.maladaptiveSelected = behavior;
    console.log(behavior);
    // this.maladp_added.push({
    //   maladaptive : behavior
    // })
  }

  selectReplacement(replacemen:any){
    this.replacementSelected = replacemen;
    console.log(this.replacementSelected);
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

  
  


  addReplacement(){
    this.replacementgroup.push({
      goal: this.replacementSelected.goal,
      total_trials: this.total_trials,
      number_of_correct_response: this.number_of_correct_response,
    })
    if(this.replacementgroup.length > 1){
      this.replacementgroup.splice(this.replacementgroup,1);
    }
    this.replacementSelected = null;
    this.goal = '';
    this.total_trials = null;
    this.number_of_correct_response = null;
  }

  addMaladaptive(){
    this.maladaptivegroup.push({
      maladaptive_behavior: this.maladaptiveSelected.maladaptive_behavior,
      number_of_occurrences: this.number_of_occurrences,
    })
    if(this.maladaptivegroup.length > 1){
      this.maladaptivegroup.splice(this.maladaptivegroup,1);
    }
    this.maladaptiveSelected = null;
    this.maladaptive_behavior = '';
    this.number_of_occurrences = null;
  }

  deleteLTOGoal(i:any){
    this.replacementGoals.splice(i,1);
  }

  cambiarStatus(goalsto:any){
    // this.status_sto_edit = goalsto;
    // console.log(this.status_sto_edit.status_sto);

    // let data ={
    //   goalstos: this.golsto,
    //   goalltos: this.gollto,
    // }
    
    // this.goalService.editGoal(data, this.goalmaladaptiveid).subscribe(
    //   resp =>{
    //     // console.log(resp);
    //     // this.getTableData();
    //     Swal.fire('Updated', `Goal Updated successfully!`, 'success');
    //     this.ngOnInit();
    //   }
    // )
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
    Swal.fire('Updated', ` Interventions Updated`, 'success');
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

  

  save(){debugger
    this.text_validation = '';
    // if(!this.name||!this.email ||!this.surname ){
    //   this.text_validation = 'Los campos con * son obligatorios';
    //   return;
    // }

    // if(this.password != this.password_confirmation  ){
    //   this.text_validation = 'Las contraseña debe ser igual';
    //   return;
    // }
    


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

    
    
    formData.append('provider_name_g', this.selectedValueProviderName);
    formData.append('time_in', this.selectedValueTimeIn+'');
    formData.append('time_out', this.selectedValueTimeOut+'');
    formData.append('time_in2', this.selectedValueTimeIn2+'');
    formData.append('time_out2', this.selectedValueTimeOut2+'');
    formData.append('environmental_changes', this.environmental_changes);
    

    formData.append('provider_name_g', this.selectedValueProviderName);
    formData.append('provider_name', this.selectedValueRBT);
    formData.append('supervisor_name', this.selectedValueBCBA);

    formData.append('replacements', JSON.stringify(this.replacementgroup));
    formData.append('maladaptives', JSON.stringify(this.maladaptivegroup));
    formData.append('interventions', JSON.stringify(this.intervention_added));

    formData.append('as_evidenced_by', this.as_evidenced_by);
    formData.append('client_appeared', this.client_appeared);
    formData.append('client_response_to_treatment_this_session', this.client_response_to_treatment_this_session);
    
    formData.append('imagen', this.FILE_SIGNATURE_RBT);
    formData.append('imagenn', this.FILE_SIGNATURE_BCBA);
    
    
    this.noteRbtService.editNote(formData,this.note_selectedId ).subscribe((resp:any)=>{
      // console.log(resp);
      
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        // this.text_success = 'Employer created';
        // this.ngOnInit();
        Swal.fire('Updated', ` Note Rbt Updated`, 'success');
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
