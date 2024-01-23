import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { PatientMService } from '../service/patient-m.service';

@Component({
  selector: 'app-edit-patient-m',
  templateUrl: './edit-patient-m.component.html',
  styleUrls: ['./edit-patient-m.component.scss']
})
export class EditPatientMComponent {
  public routes = routes;
  public selectedValue!: string;

  public patient_id: any;
  public f: string = '';
  public pat_id: any;

  public first_name: string = '';
  public last_name: string = '';
  public parent_guardian_name: string = '';
  public relationship: any;
  public language: string = '';
  public phone: string = '';
  public cell_phone: string = '';
  public work_phone: string = '';
  public zip: string = '';
  public state: string = '';
  public email: string = '';
  public education: string = '';
  public profession: string = '';
  public school_name: string = '';
  public school_number: string = '';
  public birth_date: string = '';
  public age: number = 0;
  public gender: number = 1;
  public address: string = '';
  public special_note: any;
  public city: any;
  public patient_control: any;
  public schedule: any;
  public summer_schedule: any;
  public diagnosis_code: any;

  public insuranceId: any;
  public insurer_secundary: any;
  public insuranceId_secundary: any;
  public elegibility_date: any;
  public pos_covered: any;
  public deductible_individual_I_F: any;
  public balance: any;
  public coinsurance: any;
  public copayments: any;
  public oop: any;
  
  public pa_assessment: any;
  public pa_assessment_start_date: string = '';
  public pa_assessment_end_date: string = '';
  public pa_services: any = [];
  public services:any = [];
  public n_code: any;
  public s_unit: any;
  public pa_services_start_date: string = '';
  public pa_services_end_date: string = '';
  
  public welcome: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public consent: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public insurance_card: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public mnl: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public referral: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public ados: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public iep: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public asd_diagnosis: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public cde: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public submitted: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';

 

  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any = 'assets/img/user-06.jpg';

  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;
  text_success:any = null;

  public patient_selected:any;

  
  constructor(
    public patientService:PatientMService,
    public router: Router,
    public ativatedRoute: ActivatedRoute,

  ){

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.id;
     })
     this.showUser();
  }
  
showUser(){
    this.patientService.getPatient(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.patient_selected = resp.patient;

        this.first_name = this.patient_selected.first_name;
        this.last_name = this.patient_selected.last_name;
        this.parent_guardian_name = this.patient_selected.parent_guardian_name;
        this.relationship = this.patient_selected.relationship;
        this.language = this.patient_selected.language;
        this.phone = this.patient_selected.phone;
        this.cell_phone = this.patient_selected.cell_phone;
        this.work_phone = this.patient_selected.work_phone;
        this.zip = this.patient_selected.zip;
        this.email = this.patient_selected.email;
        this.education = this.patient_selected.education;
        this.profession = this.patient_selected.profession;
        this.school_name = this.patient_selected.school_name;
        this.school_number = this.patient_selected.school_number;
        this.age = this.patient_selected.age;
        this.birth_date = this.patient_selected.birth_date ? new Date(this.patient_selected.birth_date).toISOString(): '';       
        this.gender = this.patient_selected.gender;
        this.pat_id = this.patient_selected.pat_id;
        this.address = this.patient_selected.address;
        this.city = this.patient_selected.city;
        this.state = this.patient_selected.state;
        this.patient_control = this.patient_selected.patient_control;
        this.special_note = this.patient_selected.special_note;
        this.schedule = this.patient_selected.schedule;
        this.summer_schedule = this.patient_selected.summer_schedule;
        this.diagnosis_code = this.patient_selected.diagnosis_code;
        
        this.insuranceId = this.patient_selected.insuranceId;
        this.insurer_secundary = this.patient_selected.insurer_secundary;
        this.insuranceId_secundary = this.patient_selected.insuranceId_secundary;
        this.elegibility_date = this.patient_selected.elegibility_date? new Date(this.patient_selected.elegibility_date).toISOString(): '';   
        this.pos_covered = this.patient_selected.pos_covered;
        this.deductible_individual_I_F = this.patient_selected.deductible_individual_I_F;
        this.balance = this.patient_selected.balance;
        this.coinsurance = this.patient_selected.coinsurance;
        this.copayments = this.patient_selected.copayments;
        this.oop = this.patient_selected.oop;
        
        
        this.pa_assessment = this.patient_selected.pa_assessment;
        this.pa_assessment_start_date = this.patient_selected.pa_assessment_start_date ? new Date(this.patient_selected.pa_assessment_start_date).toISOString(): '';
        this.pa_assessment_end_date = this.patient_selected.pa_assessment_end_date ? new Date(this.patient_selected.pa_assessment_end_date).toISOString(): '';
        this.pa_services = this.patient_selected.pa_services;
        this.pa_services_start_date = this.patient_selected.pa_services_start_date ? new Date(this.patient_selected.pa_services_start_date).toISOString(): '';
        this.pa_services_end_date = this.patient_selected.pa_services_end_date ? new Date(this.patient_selected.pa_services_end_date).toISOString(): '';
        
        
        this.welcome = this.patient_selected.welcome;
        this.consent = this.patient_selected.consent;
        this.insurance_card = this.patient_selected.insurance_card;
        this.mnl = this.patient_selected.mnl;
        this.referral = this.patient_selected.referral;
        this.ados = this.patient_selected.ados;
        this.iep = this.patient_selected.iep;
        this.asd_diagnosis = this.patient_selected.asd_diagnosis;
        this.cde = this.patient_selected.cde;
        this.submitted = this.patient_selected.submitted;

        this.IMAGE_PREVISUALIZA = this.patient_selected.avatar;
    })
  }

  addService(){
    this.services.push({
      n_code: this.n_code,
      s_unit: this.s_unit
    })
    this.n_code = '';
    this.s_unit = '';
  }

  deleteService(i:any){
    this.services.splice(i,1);
  }

  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }

  save(){
    this.text_validation = '';
    if(!this.first_name ||!this.last_name || !this.pat_id ){
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }


    // this.valid_form = false;
    let formData = new FormData();

    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('phone', this.phone);
    formData.append('cell_phone', this.cell_phone);
    formData.append('work_phone', this.work_phone);
    formData.append('gender', this.gender+'');
    formData.append('address', this.address);
    formData.append('zip', this.zip);
    formData.append('pat_id', this.pat_id);
    formData.append('city', this.city);
    formData.append('state', this.state);
    formData.append('education', this.education);
    formData.append('profession', this.profession);
    formData.append('school_name', this.school_name);
    formData.append('school_number', this.school_number);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('age', this.age+'');
    
    if(this.diagnosis_code){

      formData.append('diagnosis_code', this.diagnosis_code);
    }
    if(this.parent_guardian_name){

      formData.append('parent_guardian_name', this.parent_guardian_name);
    }
    if(this.relationship){

      formData.append('relationship', this.relationship);
    }
    if(this.language){

      formData.append('language', this.language);
    }
    if(this.patient_control){

      formData.append('patient_control', this.patient_control);
    }
    if(this.special_note){
      formData.append('special_note', this.special_note);
    }
    
    if(this.schedule){

      formData.append('schedule', this.schedule);
    }
    if(this.insuranceId){

      formData.append('insuranceId', this.insuranceId);
    }
    if(this.insurer_secundary){

      formData.append('insurer_secundary', this.insurer_secundary);
    }
    if(this.insuranceId_secundary){

      formData.append('insuranceId_secundary', this.insuranceId_secundary);
    }
    
    if(this.elegibility_date){

      formData.append('elegibility_date', this.elegibility_date);
    }
    
    if(this.pos_covered){
      formData.append('pos_covered', this.pos_covered);
    
    }
    if(this.deductible_individual_I_F){
      formData.append('deductible_individual_I_F', this.deductible_individual_I_F);
    }
    if(this.balance){
      formData.append('balance', this.balance);
    }
    if(this.coinsurance){
      formData.append('coinsurance', this.coinsurance);
    }
    if(this.copayments){
      formData.append('copayments', this.copayments);
    }
    
    if(this.oop){
      formData.append('oop', this.oop);
    }

    if(this.pa_assessment){

      formData.append('pa_assessment', this.pa_assessment);
    }
    if(this.pa_assessment_start_date){

      formData.append('pa_assessment_start_date', this.pa_assessment_start_date);
    }
    if(this.pa_assessment_end_date){

      formData.append('pa_assessment_end_date', this.pa_assessment_end_date);
    }
    if(this.pa_assessment){

      formData.append('pa_assessment', this.pa_assessment);
    }
    if(this.services){
      formData.append('services', JSON.stringify(this.services));
    }
    if(this.pa_services_start_date){

      formData.append('pa_services_start_date', this.pa_services_start_date);
    }
    if(this.pa_services_end_date){

      formData.append('pa_services_end_date', this.pa_services_end_date);
    }


    if(this.welcome){
      formData.append('welcome', this.welcome);
    }
    if(this.consent){
      formData.append('consent', this.consent);
    }
    if(this.insurance_card){
      formData.append('insurance_card', this.insurance_card);
    }
    if(this.mnl){
      formData.append('mnl', this.mnl);
    }
    if(this.referral){
      formData.append('referral', this.referral);
    }
    if(this.ados){
      formData.append('ados', this.ados);
    }
    if(this.iep){
      formData.append('iep', this.iep);
    }
    if(this.asd_diagnosis){
      formData.append('asd_diagnosis', this.asd_diagnosis);
    }
    if(this.cde){
      formData.append('cde', this.cde);
    }
    if(this.submitted){
      formData.append('submitted', this.submitted);
    }
    if(this.birth_date){
      formData.append('birth_date', this.birth_date);
    }
    if(this.email){
      formData.append('email', this.email);
    }
    if(this.FILE_AVATAR){
      formData.append('imagen', this.FILE_AVATAR);
    }

    this.valid_form_success = false;
    this.text_validation = '';

    this.patientService.editPatient(formData, this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = "El Paciente se ha actualizado";
      }
    })


  }
}
