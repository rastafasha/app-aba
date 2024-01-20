import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Router } from '@angular/router';
import { PatientMService } from '../service/patient-m.service';
import { DoctorService } from '../../doctors/service/doctor.service';

@Component({
  selector: 'app-add-patient-m',
  templateUrl: './add-patient-m.component.html',
  styleUrls: ['./add-patient-m.component.scss']
})
export class AddPatientMComponent {
  public routes = routes;
  public selectedValue!: string;
  public patient_id: any;
  public pat_id: any;

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
  
  constructor(
    public patientService:PatientMService,
    public doctorService:DoctorService,
    public router: Router,
  ){

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.doctorService.closeMenuSidebar();
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
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('telehealth', this.telehealth);
    formData.append('insurer', this.insurer);
    formData.append('compayment_per_visit', this.compayment_per_visit);
    formData.append('patient_control', this.patient_control);
    formData.append('pa_assessment', this.pa_assessment);
    formData.append('ba_services_start_date', this.ba_services_start_date);
    formData.append('current_auth_expires', this.current_auth_expires);
    formData.append('need_cognitive_eval', this.need_cognitive_eval);
    formData.append('schedule', this.schedule);
    formData.append('rst', this.rst);
    formData.append('an_wk_s', this.an_wk_s);
    formData.append('pt', this.pt);
    formData.append('school_bcba', this.school_bcba);
    formData.append('analyst_bcba', this.analyst_bcba);
    formData.append('data_report_and_rbt_correction', this.data_report_and_rbt_correction);
    formData.append('parent_comunication', this.parent_comunication);
    formData.append('notes', this.notes);
    formData.append('rst_wk_hr', this.rst_wk_hr);
    formData.append('welcome', this.welcome);
    formData.append('consent', this.consent);
    formData.append('insurance_card', this.insurance_card);
    formData.append('mnl', this.mnl);
    formData.append('referral', this.referral);
    formData.append('ados', this.ados);
    formData.append('iep', this.iep);
    formData.append('asd_diagnosis', this.asd_diagnosis);
    formData.append('cde', this.cde);
    formData.append('submitted', this.submitted);
    
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

    this.patientService.createPatient(formData).subscribe((resp:any)=>{
      // console.log(resp);
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.router.navigate(['/patients/list']);
      }
    })


  }
}
