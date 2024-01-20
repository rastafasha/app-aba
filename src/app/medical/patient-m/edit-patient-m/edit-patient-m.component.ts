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

  public first_name: string = '';
  public last_name: string = '';
  public phone: string = '';
  public email: string = '';
  public birth_date: string = '';
  public gender: number = 1;
  public address: string = '';
  public n_doc: any;
  
  public city: any;
  public eligibility: number = 1;
  public pat_id: any;
  public diagnosis_code: any;
  public telehealth: any;
  public insurer: any;
  public compayment_per_visit: any;
  public patient_control: any;
  public pa_assessment: any;
  public pa_services: any;
  public ba_services_start_date: string = '';
  public current_auth_expires: string = '';
  public need_cognitive_eval: any;
  public schedule: any;
  public rst: any;
  public an_wk_s: any;
  public pt: any;
  public school_bcba: any;
  public analyst_bcba: any;
  public data_report_and_rbt_correction: any;
  public parent_comunication: any;
  public notes: any;
  public rst_wk_hr: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no'; 
  public welcome: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no';
  public consent: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no'; 
  public insurance_card: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no';
  public mnl: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no'; 
  public referral: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no'; 
  public ados: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no'; 
  public iep: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no'; 
  public asd_diagnosis: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no'; 
  public cde: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no'; 
  public submitted: 'pending' | 'resquested' | 'need ne'| 'yes'| 'no';



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
        this.phone = this.patient_selected.phone;
        this.email = this.patient_selected.email;
        this.birth_date = this.patient_selected.birth_date ? new Date(this.patient_selected.birth_date).toISOString(): '';       
        this.gender = this.patient_selected.gender;
        this.address = this.patient_selected.address;
        this.n_doc = this.patient_selected.n_doc;
        this.city = this.patient_selected.city;
        this.pat_id = this.patient_selected.pat_id;
        this.diagnosis_code = this.patient_selected.diagnosis_code;
        this.telehealth = this.patient_selected.telehealth;
        this.insurer = this.patient_selected.insurer;
        this.compayment_per_visit = this.patient_selected.compayment_per_visit;
        this.patient_control = this.patient_selected.patient_control;
        this.pa_assessment = this.patient_selected.pa_assessment;
        this.pa_services = this.patient_selected.pa_services;
        this.ba_services_start_date = this.patient_selected.ba_services_start_date ? new Date(this.patient_selected.ba_services_start_date).toISOString(): '';
        this.current_auth_expires = this.patient_selected.current_auth_expires ? new Date(this.patient_selected.current_auth_expires).toISOString(): '';
        this.need_cognitive_eval = this.patient_selected.need_cognitive_eval;
        this.schedule = this.patient_selected.schedule;
        this.rst = this.patient_selected.rst;
        this.an_wk_s = this.patient_selected.an_wk_s;
        this.pt = this.patient_selected.pt;
        this.school_bcba = this.patient_selected.school_bcba;
        this.analyst_bcba = this.patient_selected.analyst_bcba;
        this.data_report_and_rbt_correction = this.patient_selected.data_report_and_rbt_correction;
        this.parent_comunication = this.patient_selected.parent_comunication;
        this.notes = this.patient_selected.notes;
        this.rst_wk_hr = this.patient_selected.rst_wk_hr;
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
    if(!this.first_name ||!this.last_name || !this.n_doc ){
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }


    // this.valid_form = false;
    let formData = new FormData();

    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('phone', this.phone);
    formData.append('gender', this.gender+'');
    formData.append('address', this.address);
    formData.append('n_doc', this.n_doc);
    formData.append('city', this.city);
    formData.append('pat_id', this.pat_id);
    
    if(this.diagnosis_code){

      formData.append('diagnosis_code', this.diagnosis_code);
    }
    if(this.telehealth){

      formData.append('telehealth', this.telehealth);
    }
    if(this.insurer){

      formData.append('insurer', this.insurer);
    }
    if(this.compayment_per_visit){

      formData.append('compayment_per_visit', this.compayment_per_visit);
    }
    if(this.patient_control){

      formData.append('patient_control', this.patient_control);
    }
    if(this.pa_assessment){

      formData.append('pa_assessment', this.pa_assessment);
    }
    if(this.ba_services_start_date){

      formData.append('ba_services_start_date', this.ba_services_start_date);
    }
    if(this.current_auth_expires){

      formData.append('current_auth_expires', this.current_auth_expires);
    }
    if(this.need_cognitive_eval){

      formData.append('need_cognitive_eval', this.need_cognitive_eval);
    }
    if(this.schedule){

      formData.append('schedule', this.schedule);
    }
    if(this.rst){

      formData.append('rst', this.rst);
    }
    
    if(this.pt){
      formData.append('pt', this.pt);
    
    }
    if(this.school_bcba){
      formData.append('school_bcba', this.school_bcba);
    }
    if(this.analyst_bcba){
      formData.append('analyst_bcba', this.analyst_bcba);
    }
    if(this.data_report_and_rbt_correction){
      formData.append('data_report_and_rbt_correction', this.data_report_and_rbt_correction);
    }
    if(this.parent_comunication){
      formData.append('parent_comunication', this.parent_comunication);
    }
    if(this.notes){
      formData.append('notes', this.notes);
    }
    if(this.rst_wk_hr){
      formData.append('rst_wk_hr', this.rst_wk_hr);
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
