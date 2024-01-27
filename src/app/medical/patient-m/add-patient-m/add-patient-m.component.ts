import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { Router } from '@angular/router';
import { PatientMService } from '../service/patient-m.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import { InsuranceService } from '../../insurance/service/insurance.service';

@Component({
  selector: 'app-add-patient-m',
  templateUrl: './add-patient-m.component.html',
  styleUrls: ['./add-patient-m.component.scss']
})
export class AddPatientMComponent {
  public routes = routes;
  public patient_id: any;
  
  public pat_id: any;
  public first_name: string = '';
  public last_name: string = '';
  public parent_guardian_name: string = '';
  public relationship: any;
  public language: string = '';
  public phone: string = '';
  public home_phone: string = '';
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

  

  public insurer: any;
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
  public pa_services: any;
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

  public specialists:any = [];
  public insurances:any = [];
  public insurance:any;
  public selectedValue_rbt!: string;
  public selectedValue_rbt2!: string;
  public selectedValue_bcba!: string;
  public selectedValue_bcba2!: string;
  public selectedValue_clind!: string;
  public selectedValue_insurer!: string;
  public rbt: any;
  public rbt2: any;
  public bcba: any;
  public bcba2: any;
  public clin_director: any;

  public insurance_id: any;
  public id: any;
 
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any = 'assets/img/user-06.jpg';
  
  
  public FILE_DOCTOR_REFERAL:any;
  public IMAGE_PREVISUALIZA_DOCTOR_REFERAL:any = 'assets/img/user-06.jpg';
  public FILE_MEDICAL_NOTES:any;
  public IMAGE_PREVISUALIZA_MEDICAL_NOTES:any = 'assets/img/user-06.jpg';
  public FILE_CDE:any;
  public IMAGE_PREVISUALIZA_CDE:any = 'assets/img/user-06.jpg';
  public FILE_IEP:any;
  public IMAGE_PREVISUALIZA_IEP:any = 'assets/img/user-06.jpg';
  public FILE_MNL:any;
  public IMAGE_PREVISUALIZA_MNL:any = 'assets/img/user-06.jpg';
  public FILE_REFERAL:any;
  public IMAGE_PREVISUALIZA_REFERAL:any = 'assets/img/user-06.jpg';

  public insurer_name: any;
  public notes: any= [];
  public services: any= [];
  

  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;
  
  constructor(
    public patientService:PatientMService,
    public doctorService:DoctorService,
    public insuranceService:InsuranceService,
    public router: Router,
  ){

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.doctorService.closeMenuSidebar();
    this.getConfig();
  }

  getConfig(){
    this.patientService.listConfig().subscribe((resp:any)=>{
      // console.log(resp);
      this.specialists = resp.specialists;
      this.insurances = resp.insurances;
    })
  }
  insuranceData(){
    this.insurance_id=this.insurance_id
    this.insuranceService.showInsurance(this.insurance_id).subscribe((resp:any)=>{
      console.log(resp);
      this.insurance = resp;
      this.insurer_name = resp.insurer_name;
      this.notes = resp.notes;
      this.services = resp.services;
    })
  }
  selectInsurance(id:any){debugger
    // this.insuranceData();
    this.insurance_id=id;
    this.insuranceService.showInsurance(this.insurance_id).subscribe((resp:any)=>{
      console.log(resp);
      this.insurance = resp;
      this.insurer_name = resp.insurer_name;
      this.notes = resp.notes;
      this.services = resp.services;
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
  loadFileDoctorR($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo pdf';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }
  loadFileMedicalNote($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo pdf';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }
 

  save(){debugger
    this.text_validation = '';
    if(!this.first_name ||!this.last_name || !this.pat_id ){
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }
    

    // this.valid_form = false;
    let formData = new FormData();

    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('parent_guardian_name', this.parent_guardian_name);
    formData.append('relationship', this.relationship);
    formData.append('language', this.language);
    formData.append('home_phone', this.home_phone);
    formData.append('work_phone', this.work_phone);
    formData.append('phone', this.phone);
    formData.append('gender', this.gender+'');
    formData.append('zip', this.zip);
    formData.append('state', this.state);
    formData.append('address', this.address);
    formData.append('city', this.city);
    formData.append('education', this.education);
    formData.append('profession', this.profession);
    formData.append('school_name', this.school_name);
    formData.append('school_number', this.school_number);
    formData.append('age', this.age+'');
    formData.append('pat_id', this.pat_id);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('schedule', this.schedule);
    formData.append('summer_schedule', this.summer_schedule);
    formData.append('patient_control', this.patient_control);
    formData.append('special_note', this.special_note);
    
    formData.append('insurer', this.selectedValue_insurer);
    formData.append('insuranceId', this.insuranceId);
    formData.append('insurer_secundary', this.insurer_secundary);
    formData.append('insuranceId_secundary', this.insuranceId_secundary);
    formData.append('elegibility_date', this.elegibility_date);
    formData.append('pos_covered', this.pos_covered);
    formData.append('deductible_individual_I_F', this.deductible_individual_I_F);
    formData.append('balance', this.balance);
    formData.append('coinsurance', this.coinsurance);
    formData.append('copayments', this.copayments);
    formData.append('oop', this.oop);

    formData.append('pa_assessment', this.pa_assessment);
    formData.append('pa_assessment_start_date', this.pa_assessment_start_date);
    formData.append('pa_assessment_end_date', this.pa_assessment_end_date);
    formData.append('pa_services', this.pa_services);
    formData.append('pa_services_start_date', this.pa_services_start_date);
    formData.append('pa_services_end_date', this.pa_services_end_date);
    
    
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

    formData.append('rbt', this.selectedValue_rbt);
    formData.append('rbt2', this.selectedValue_rbt2);
    formData.append('bcba', this.selectedValue_bcba);
    formData.append('bcba2', this.selectedValue_bcba2);
    formData.append('clin_director', this.selectedValue_clind);
    
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
