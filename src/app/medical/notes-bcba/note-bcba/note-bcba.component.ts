import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import Swal from 'sweetalert2';
import { NoteRbtService } from '../../notes/services/note-rbt.service';
import { NoteBcbaService } from '../services/note-bcba.service';
import { InsuranceService } from '../../insurance/service/insurance.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-note-bcba',
  templateUrl: './note-bcba.component.html',
  styleUrls: ['./note-bcba.component.scss']
})
export class NoteBcbaComponent {
  public routes = routes;

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
  public selectedValueRendering!: string;
  public selectedValueAba!: string;
  public selectedValueCode!: string;
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

  public porcent_of_occurrences:number = 0;
  public porcent_of_correct_response:number = 0;
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
  public location: any;
  public birth_date: string = '';
  public rendering_provider: any;

  public roles_rbt:any = [];
  public roles_bcba:any = [];

  public hours_days:any =[];
  public specialists:any =[];
  public maladaptives:any =[];
  public replacementGoals:any =[];
  public intervention_added:any =[];
  public replacements:any =[];

  maladaptiveSelected:any =null;
  replacementSelected:any =null;
  lto:any =null;
  caregiver_goal:any =null;
  maladp_added:any =[];
  replacement_added:any =[];
  pa_assessments:any =[];
  pa_assessmentsgroup:any =[];
  familiEnvolments:any =[];
  monitoringEvaluatingPatientIds:any =[];
  caregivers_training_goals:any =[];
  rbt_training_goals:any =[];
  note_description:any ;
  insurer_name:any ;
  services:any ;
  insurer_id:any ;
  cpt:any;
  public roles:any = [];
  electronic_signature:any ;
  doctor:any ;
  full_name:any ;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalService:GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public noteBcbaService: NoteBcbaService,
    public doctorService: DoctorService,
    public insuranceService: InsuranceService,
    public locations: Location,
  ){}

  ngOnInit(): void {
    
    // window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.patient_id;
     })
     this.getConfig();
     this.getProfileBip();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.roles = this.user.roles[0];
    this.doctor_id = this.user.id;
    this.getDoctor();
    this.specialistData();
  }

  goBack() {
    this.locations.back(); // <-- go back to previous location on cancel
  }

  getDoctor(){
    this.doctorService.showDoctor(this.doctor_id).subscribe((resp:any)=>{
      this.doctor = resp.user;
      this.electronic_signature = resp.user.electronic_signature;
      this.full_name = resp.user.full_name;
    })
  }
  

  
  getConfig(){
    this.noteBcbaService.listConfigNote().subscribe((resp:any)=>{
      // console.log(resp);

      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.hours_days = resp.hours;
      this.specialists = resp.specialists;

      this.FILE_SIGNATURE_RBT = resp.roles_rbt.electronic_signature;
      this.FILE_SIGNATURE_BCBA = resp.roles_bcba.electronic_signature;
      
    })
  }

  getProfileBip(){
    this.bipService.showBipProfile(this.patient_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp.patient;

      this.first_name = this.client_selected.first_name;
      this.last_name = this.client_selected.last_name;
      this.patient_id = this.client_selected.patient_id;
      this.pos = JSON.parse(resp.patient.pos_covered) ;
      this.birth_date = this.client_selected.birth_date ? new Date(this.client_selected.birth_date).toISOString(): '';
      console.log(this.birth_date); 
      this.diagnosis_code = this.client_selected.diagnosis_code;  
      this.insurer_id = this.client_selected.insurer_id;  

      this.selectedValueAba = resp.patient.clin_director_id;
      this.selectedValueRendering = resp.patient.bcba_id;
      this.selectedValueBCBA = resp.patient.clin_director_id;
      this.selectedValueRBT = resp.patient.bcba_id;

      
      this.getReplacementsByPatientId();
      this.getMaladaptivesBipByPatientId();
      this.insuranceData();
    });
  }

  insuranceData(){
    this.insuranceService.showInsurance(this.insurer_id).subscribe((resp:any)=>{
      console.log(resp);
      this.insurer_name = resp.insurer_name;
      // this.notes = resp.notes;
      this.services = resp.services;
    })
  }

  getReplacementsByPatientId(){
    this.noteBcbaService.showReplacementbyPatient(this.patient_id).subscribe((resp:any)=>{
      console.log(resp);
      this.familiEnvolments = resp.familiEnvolments;
      this.caregivers_training_goals = resp.familiEnvolments.data[0].caregivers_training_goals;
      this.monitoringEvaluatingPatientIds = resp.monitoringEvaluatingPatientIds;
      this.rbt_training_goals = resp.monitoringEvaluatingPatientIds.data[0].rbt_training_goals;

      this.pa_assessments = resp.pa_assessments;
      let jsonObj = JSON.parse(this.pa_assessments) || '';
      this.pa_assessmentsgroup = jsonObj;
      console.log(this.pa_assessmentsgroup);
      // this.cpt = this.pa_assessmentsgroup[0].cpt;
      console.log(this.cpt);  
    })
  }

  specialistData(){
    this.doctorService.showDoctorProfile(this.doctor_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.provider_credential = resp.doctor.certificate_number;
      // this.notes = resp.notes;
      // this.services = resp.services;
    })
  }

  specialistDataSupervisor(selectedValueAba){
    this.doctorService.showDoctorProfile(selectedValueAba).subscribe((resp:any)=>{
      // console.log(resp);
      this.provider_credential = resp.doctor.certificate_number;
      // this.notes = resp.notes;
      // this.services = resp.services;
    })
  }

  getMaladaptivesBipByPatientId(){
    this.bipService.getBipProfilePatient_id(this.patient_id).subscribe((resp:any)=>{
      console.log(resp);
      // this.maladaptives = resp.bip.maladaptives;
      this.bip_id = resp.id;
    })
  }

  // selectSpecialist(event:any){
  //   event = this.selectedValueRendering;
  //   this.specialistData(this.selectedValueRendering);
  //   console.log(this.selectedValueRendering);
    
  // }
  selectSpecialistab(event:any){
    event = this.selectedValueAba;
    this.specialistDataSupervisor(this.selectedValueAba);
    console.log(this.selectedValueAba);
    
  }



  speciaFirmaData(selectedValueRBT){
    this.doctorService.showDoctorProfile(selectedValueRBT).subscribe((resp:any)=>{
      console.log(resp);
      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED = resp.doctor.electronic_signature;
      // this.notes = resp.notes;
      // this.services = resp.services;
    })
  }
  selectFirmaSpecialistRbt(event:any){
    event = this.selectedValueRBT;
    this.speciaFirmaData(this.selectedValueRBT);
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
  }
  hourTimeOutSelected(value:number){
    this.selectedValueTimeOut = value;

  }

  selectMaladaptive(behavior:any,i){
    this.maladaptiveSelected = behavior;
    this.caregivers_training_goals[i]= behavior
  }

  

  addMaladaptive(maladaptiveSelected:any,i){
    this.maladaptiveSelected = maladaptiveSelected;
    this.caregivers_training_goals[i]= maladaptiveSelected
    // this.caregivers_training_goals.push({
    //   caregiver_goal: this.maladaptiveSelected.caregiver_goal,
    //   porcent_of_correct_response: this.porcent_of_correct_response,
    // })
    // if(this.caregivers_training_goals.length > 1){
    //   this.caregivers_training_goals.splice(this.caregivers_training_goals,1);
    // }
    this.maladaptiveSelected = null;
    this.caregiver_goal = '';
    this.porcent_of_correct_response = null;
  }
  selectReplacement(replacemen:any,i){
    this.replacementSelected = replacemen;
    this.rbt_training_goals[i]= replacemen;
  }

  addReplacement(replacementSelected:any,i){
    this.replacementSelected = replacementSelected;
    this.rbt_training_goals[i]= replacementSelected;
    // this.rbt_training_goals.push({
    //   lto: this.replacementSelected.lto,
    //   porcent_of_correct_response: this.porcent_of_correct_response,
    // })
    // if(this.rbt_training_goals.length > 1){
    //   this.rbt_training_goals.splice(this.rbt_training_goals,1);
    // }
    this.replacementSelected = null;
    this.lto = '';
    this.porcent_of_correct_response = null;
  }

  

  back(){
    this.replacementSelected = null;
    this.maladaptiveSelected = null;
    this.porcent_of_occurrences = null;
    this.porcent_of_correct_response = null;
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
    if(!this.rbt_training_goals 
      ||!this.caregivers_training_goals ){
      this.text_validation = 'All Fields (*) are required';
      return;
    }

    // if(this.password != this.password_confirmation  ){
    //   this.text_validation = 'Las contraseña debe ser igual';
    //   return;
    // }
    


    let formData = new FormData();
    formData.append('patient_id', this.patient_id);
    formData.append('doctor_id', this.doctor_id);
    formData.append('bip_id', this.bip_id);
    
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('location', this.location);
    formData.append('birth_date', this.birth_date);
    
    
    formData.append('rendering_provider', this.doctor_id);
    formData.append('aba_supervisor', this.selectedValueAba);
    formData.append('cpt_code', this.selectedValueCode);
    
    formData.append('provider_name', this.doctor_id);
    formData.append('supervisor_name', this.selectedValueBCBA);
    formData.append('note_description', this.note_description);

    formData.append('rbt_training_goals', JSON.stringify(this.rbt_training_goals));
    formData.append('caregiver_goals', JSON.stringify(this.caregivers_training_goals));

    formData.append('session_date', this.session_date);

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


    // formData.append('imagen', this.FILE_SIGNATURE_RBT);
    // formData.append('imagenn', this.FILE_SIGNATURE_BCBA);

    formData.append('provider_signature', this.doctor.electronic_signature);
    
    if(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED ){
      formData.append('supervisor_signature', this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
    }

    // if(this.FILE_SIGNATURE_RBT ){
    //   formData.append('imagen', this.FILE_SIGNATURE_RBT);
    // }
    // if(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED ){
    //   formData.append('imagen', this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
    // }
    // if(this.FILE_SIGNATURE_RBT ){
    //   formData.append('imagenn', this.FILE_SIGNATURE_RBT);
    // }
    // if(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED ){
    //   formData.append('imagenn', this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
    // }
    
    
    this.noteBcbaService.createNote(formData).subscribe((resp:any)=>{
      // console.log(resp);
      
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = 'Note BCBA created';
        // this.ngOnInit();
        Swal.fire('Created', ` Note BCBA Created`, 'success');
        this.router.navigate(['/note-bcba/listbyclient/',this.patient_id]);
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
