import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import Swal from 'sweetalert2';
import { NoteBcbaService } from '../services/note-bcba.service';
import { InsuranceService } from '../../insurance/service/insurance.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-note-bcba-edit',
  templateUrl: './note-bcba-edit.component.html',
  styleUrls: ['./note-bcba-edit.component.scss']
})
export class NoteBcbaEditComponent {
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
  public selectedValueRendering!: string;
  public selectedValueAba!: string;
  public selectedValueCode!: string;
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
  public specialists:any =[];
  public maladaptives:any =[];
  public replacementGoals:any =[];
  public intervention_added:any =[];
  public replacements:any =[];
  public interventionsgroup:any =[];

  public maladaptivegroup:any =[];
  public replacementgroup:any =[];

  maladaptiveSelected:any =null;
  replacementSelected:any =null;
  birth_date:any ;
  cpt:any ;
  note_description:any ;
  caregivers_training_goals:any =[];
  rbt_training_goals:any =[];
  rbt_training_goalsgroup:any =[];
  caregivers_training_goalsgroup:any =[];

  public location: any;
  public porcent_of_occurrences:number = 0;
  public porcent_of_correct_response:number = 0;
  lto:any =null;
  caregiver_goal:any =null;
  cpt_code:any =null;

  insurer_name:any ;
  services:any ;
  insurer_id:any ;

  

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
      this.note_id = resp.id;
     })
     this.getConfig();
     this.getNote();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;
  }

  goBack() {
    this.locations.back(); // <-- go back to previous location on cancel
  }

 
  getConfig(){
    this.noteBcbaService.listConfigNote().subscribe((resp:any)=>{
      console.log(resp);

      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.hours_days = resp.hours;
      this.specialists = resp.specialists;
      
    })
  }

  getNote(){
    this.noteBcbaService.getNote(this.note_id).subscribe((resp:any)=>{
      console.log(resp);
      this.note_selected = resp.noteBcba;
      this.note_selectedId = resp.noteBcba.id;
      this.patient_id = this.note_selected.patient_id;
      this.bip_id = this.note_selected.bip_id;
      this.location = this.note_selected.location;
      // this.birth_date = this.note_selected.birth_date;
      this.birth_date = this.note_selected.birth_date ? new Date(this.note_selected.birth_date).toISOString(): '';

      this.provider_credential = this.note_selected.provider_credential;
      this.as_evidenced_by = this.note_selected.as_evidenced_by;
      this.client_appeared = this.note_selected.client_appeared;
      this.diagnosis_code = this.note_selected.diagnosis_code;
      this.selectedValueCode = this.note_selected.cpt_code;
      console.log(this.cpt_code);
      this.note_description = this.note_selected.note_description;
      this.client_response_to_treatment_this_session = this.note_selected.client_response_to_treatment_this_session;
      this.pos = this.note_selected.pos;
      
      
      this.caregivers_training_goalsgroup = resp.caregiver_goals;
      let jsonObj = JSON.parse(this.caregivers_training_goalsgroup) || '';
      this.caregivers_training_goals = jsonObj;
      console.log(this.caregivers_training_goals);

      
      this.rbt_training_goalsgroup = resp.rbt_training_goals;
      let jsonObj1 = JSON.parse(this.rbt_training_goalsgroup) || '';
      this.rbt_training_goals = jsonObj1;
      console.log(this.rbt_training_goals);

      this.selectedValueAba = resp.noteBcba.aba_supervisor;
      this.selectedValueRendering = resp.noteBcba.rendering_provider;

      this.selectedValueProviderName = this.note_selected.provider_name_g;
      this.selectedValueRBT = this.note_selected.provider_name;
      this.selectedValueBCBA = this.note_selected.supervisor_name;

      this.session_date = this.note_selected.session_date? new Date(this.note_selected.session_date).toISOString(): '';
      
      this.session_length_total = this.note_selected.session_length_total;
      this.session_length_total2 = this.note_selected.session_length_total2;
      
      this.selectedValueTimeIn = this.note_selected.time_in;
      
      this.selectedValueTimeOut = this.note_selected.time_in2;
      this.selectedValueTimeIn2 = this.note_selected.time_out;
      this.selectedValueTimeOut2 = this.note_selected.time_out2;


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
      this.insurer_id = resp.patient.insurer_id;
      this.pos = JSON.parse(resp.patient.pos_covered) ;
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

    //si existe un elemento actualiza ese elemento en la lista
    if(this.caregivers_training_goals.length > 1){
      this.caregivers_training_goals.splice(this.caregivers_training_goals,1);
    }

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

    //si existe un elemento actualiza ese elemento en la lista
    if(this.rbt_training_goals.length > 1){
      this.rbt_training_goals.splice(this.rbt_training_goals,1);
    }
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
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('location', this.location);
    formData.append('birth_date', this.birth_date);
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
    
    if(this.selectedValueRendering ){
      formData.append('rendering_provider', this.selectedValueRendering);
    }
    if(this.selectedValueAba ){
      formData.append('aba_supervisor', this.selectedValueAba);
    }
    if(this.selectedValueCode ){
      formData.append('cpt_code', this.selectedValueCode);
    }
    if(this.selectedValueRBT ){
      formData.append('provider_name', this.selectedValueRBT);
    }
    if(this.selectedValueBCBA ){
      formData.append('supervisor_name', this.selectedValueBCBA);
    }
    if(this.note_description ){
      formData.append('note_description', this.note_description);
    }
    if(this.rbt_training_goals ){
      formData.append('rbt_training_goals', JSON.stringify(this.rbt_training_goals));
    }
    if(this.caregivers_training_goals ){
      formData.append('caregiver_goals', JSON.stringify(this.caregivers_training_goals));
    }
    

    if(this.FILE_SIGNATURE_RBT ){
      formData.append('imagen', this.FILE_SIGNATURE_RBT);
    }
    if(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED ){
      formData.append('provider_signature', this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
    }
    if(this.FILE_SIGNATURE_RBT ){
      formData.append('imagenn', this.FILE_SIGNATURE_RBT);
    }
    if(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED ){
      formData.append('supervisor_signature', this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);
    }

    this.noteBcbaService.editNote(formData,this.note_selectedId ).subscribe((resp:any)=>{
      // console.log(resp);
      
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        // this.text_success = 'Employer created';
        // this.ngOnInit();
        Swal.fire('Updated', ` Note Rbt Updated`, 'success');
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
