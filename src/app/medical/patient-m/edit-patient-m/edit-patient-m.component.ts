import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { PatientMService } from '../service/patient-m.service';
import { InsuranceService } from '../../insurance/service/insurance.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
// declare function alertClose():any;
declare var $:any;  
@Component({
  selector: 'app-edit-patient-m',
  templateUrl: './edit-patient-m.component.html',
  styleUrls: ['./edit-patient-m.component.scss']
})
export class EditPatientMComponent {
  public routes = routes;
  public selectedValue!: string;
  public selectedValueLocation!: string;
  public selectedValueInsurer!: string;
  public selectedValueCode!: string;
  public selectedValuePosCovered!: string;
  option_selected:number = 0;

  public patient_id: any;
  public f: string = '';
  
  public client_id: any;
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
  public insurer_id: any;
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
  public eqhlid: any;
  

  public pa_assessmentss: any = <any>[];
  public pa_assessments: any = <any>[];
  public pa_assessment: any;
  public pa_assessment_start_date: Date ;
  public pa_assessment_end_date: Date ;
  public pa_services: any;
  public pa_services_start_date: Date ;
  public pa_services_end_date: Date ;
  public cpt: any;
  public n_units: number = 0;

  public s_unit: any;
  public n_code: any;
  
  
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
  public eligibility: 'waiting' | 'reviewing' | 'psycho eval'| 'requested'| 'need new'| 'yes'|'no'|'2 insurance';
  public interview: 'pending'|'send' | 'receive' | 'no apply';

  

  public selectedValue_rbt!: string;
  public selectedValue_rbt2!: string;
  public selectedValue_bcba!: string;
  public selectedValue_bcba2!: string;
  public selectedValue_clind!: string;
  public selectedValue_insurer!: string;

  public rbt_id: any;
  public rbt2_id: any;
  public bcba_id: any;
  public bcba2_id: any;
  public clin_director_id: any;

  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any = 'assets/img/user-06.jpg';

  

  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any = null;
  text_success:any = null;

  public patient_selected:any;

  public specialists:any = [];
  public locations:any = [];
  public insurances:any = [];
  public notes: any= [];
  public insurer_name: any= [];
  public assesstmentlists: any= [];
  public services_code: any= [];
  public services: any= [];
  public pa_assessmentgroup: any= [];
  public poscoveredList: any = [];

  public roles_rbt:any = [];
  public roles_bcba:any = [];
  public roles_manager:any = [];
  public role_localmanager:any = [];
  public insurance_codes:any = [];
  public insurance:any;
  public insurances_name:any;
  public code:any;
  public insuranceiddd:any;
  public telehealth:boolean;
  public pay:boolean ;
  
  // public insurance:any;
  // public insurer_name: any;
  public insurance_id:any;
  public id:any;

  public user:any ;
  public doctor_id:any ;
  public location_id:any ;

  FILES:any = [];
  FilesAdded:any = [];
  public file_selected:any;
  public doc:any;
  public FILE:any;
  
  constructor(
    public patientService:PatientMService,
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public insuranceService: InsuranceService,
    private readonly sanitizer: DomSanitizer,
    private _sanitizer: DomSanitizer,

  ){

  }

  ngOnInit(): void {
    // window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.client_id = resp.id;
     })
     this.getConfig();
     this.showUser();
     this.getPoscoveredList();
    //  setTimeout(()=>{
    //   alertClose();
    // }, 50)
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;
    this.location_id = this.user.location_id;
  }

  getPoscoveredList(){
    this.patientService.getPosCovered().subscribe((res:any)=> {
        console.log("pos covered list", res);
        this.poscoveredList = res.data;
        
    });
  }

  getConfig(){
    this.patientService.listConfig(this.selectedValueLocation).subscribe((resp:any)=>{
      // console.log(resp);
      this.specialists = resp.specialists;
      this.insurances = resp.insurances;
      this.insurance_id = resp.insurances.length > 0 ? resp.insurances[0].id : '';
      // console.log(this.insurance_id);
      // this.insurances_name = resp.insurances[0].insurer_name;
      // console.log(this.insurances_name);
      this.locations = resp.locations;
      this.roles_rbt = resp.roles_rbt;
      this.roles_bcba = resp.roles_bcba;
      this.roles_manager = resp.roles_manager;
      this.role_localmanager = resp.role_localmanager;


      this.insuranceService.showInsurance(this.insurance_id).subscribe((resp:any)=>{
        // console.log(resp);
        this.insuranceiddd= resp.id;
        
        // console.log(this.insuranceiddd);
        this.insurer_name = resp.insurer_name;
        // console.log(this.insurer_name);
        // this.notes = resp.notes;
        // this.services = resp.services;
  
        
      })
    })
  }

  selectCategory(event: any){
    let VALUE = event.target.value;
    this.selectedValueLocation = VALUE;
    // console.log(this.selectedValueLocation);
    this.getConfig();
   
  }

  
  
showUser(){
    this.patientService.getPatient(this.client_id).subscribe((resp:any)=>{
      console.log(resp);
      this.patient_selected = resp.patient;
      
        //traemos el valor del id del insurer  y lo asignamos a la variable de clase para que sea global
        this.selectedValueInsurer = this.patient_selected.insurer_id;
        // console.log(this.selectedValueInsurer);
      
        //valore iniciales
        this.first_name = this.patient_selected.first_name;
        this.last_name = this.patient_selected.last_name;
        this.parent_guardian_name = this.patient_selected.parent_guardian_name;
        this.relationship = this.patient_selected.relationship;
        this.language = this.patient_selected.language;
        this.phone = this.patient_selected.phone;
        this.home_phone = this.patient_selected.home_phone;
        this.work_phone = this.patient_selected.work_phone;
        this.zip = this.patient_selected.zip;
        this.email = this.patient_selected.email;
        this.education = this.patient_selected.education;
        this.profession = this.patient_selected.profession;
        this.school_name = this.patient_selected.school_name;
        this.school_number = this.patient_selected.school_number;
        this.age = this.patient_selected.age;
        this.birth_date = new Date(this.patient_selected.birth_date).toISOString();    
        // this.birth_date = this.patient_selected.birth_date ;       
        this.gender = this.patient_selected.gender;
        this.patient_id = this.patient_selected.patient_id;
        this.address = this.patient_selected.address;
        this.city = this.patient_selected.city;
        this.state = this.patient_selected.state;
        this.patient_control = this.patient_selected.patient_control;
        this.special_note = this.patient_selected.special_note;
        this.schedule = this.patient_selected.schedule;
        this.summer_schedule = this.patient_selected.summer_schedule;
        this.diagnosis_code = this.patient_selected.diagnosis_code;
        
        //valores de isurance
        this.insuranceId = this.patient_selected.insuranceId;
        this.insurer_secundary = this.patient_selected.insurer_secundary;
        this.insuranceId_secundary = this.patient_selected.insuranceId_secundary;
        this.elegibility_date = this.patient_selected.elegibility_date? new Date(this.patient_selected.elegibility_date).toISOString(): '';   
        // this.pos_covered = this.patient_selected.pos_covered;
        this.deductible_individual_I_F = this.patient_selected.deductible_individual_I_F;
        this.balance = this.patient_selected.balance;
        this.coinsurance = this.patient_selected.coinsurance;
        this.copayments = this.patient_selected.copayments;
        this.oop = this.patient_selected.oop;
        this.eqhlid = this.patient_selected.eqhlid;
        this.telehealth = this.patient_selected.telehealth;
        this.pay = this.patient_selected.pay;

        //valores de welcome
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
        this.eligibility = this.patient_selected.eligibility;
        this.interview = this.patient_selected.interview;

        //valores de la imagen y archivos
        this.IMAGE_PREVISUALIZA = this.patient_selected.avatar;
        //  console.log(this.IMAGE_PREVISUALIZA);;

        this.pa_assessmentss = resp.pa_assessments ? resp.pa_assessments : null;// ?
        let jsonObj = JSON.parse(this.pa_assessmentss) || '';
        this.pa_assessmentgroup = jsonObj;

        //valores de los selectores
        this.selectedValueLocation = this.patient_selected.location_id;
        this.selectedValuePosCovered = this.patient_selected.pos_covered;
        this.selectedValue_rbt = this.patient_selected.rbt_home_id ? this.patient_selected.rbt_home_id : null;
        this.selectedValue_rbt2 = this.patient_selected.rbt2_school_id ? this.patient_selected.rbt2_school_id : null;
        this.selectedValue_bcba = this.patient_selected.bcba_home_id ? this.patient_selected.bcba_home_id: null;
        this.selectedValue_bcba2 = this.patient_selected.bcba2_school_id ? this.patient_selected.bcba2_school_id : null;
        this.selectedValue_clind = this.patient_selected.clin_director_id ? this.patient_selected.clin_director_id: null;

        // console.log(this.selectedValue_rbt);

        this.insuranceData(this.selectedValueInsurer);//pide el insurance guardado para el request de la lista inicial

        
        this.patientService.getLaboratoryByPatient(this.patient_id).subscribe((resp:any)=>{
          console.log(resp);
          this.FilesAdded = resp.patientFiles.data ? resp.patientFiles.data : null;
        })
    })
  }

  
  // seleccionas otro si se quiere cambiar trayendo el event como id o como objeto y pasas el valor necesario
  selectInsurance(event:any){
    event = this.selectedValueInsurer;
    this.insuranceData(this.selectedValueInsurer);// se envia el insurer para traer los codigos de los servicios
    
  }
  //recibe el id y muestra la lista 
  insuranceData(selectedValueInsurer){
    this.insuranceService.showInsurance(selectedValueInsurer).subscribe((resp:any)=>{
      // console.log('desde el insurer seleccionado',resp);
      this.services = resp.services;
    })
  }

  //listas
  

  addPAAssestment(){
    this.pa_assessmentgroup.push({
      pa_assessment: this.pa_assessment,
      pa_assessment_start_date: this.pa_assessment_start_date,
      pa_assessment_end_date: this.pa_assessment_end_date,
      pa_services: this.pa_services,
      pa_services_start_date: this.pa_services_start_date,
      pa_services_end_date: this.pa_services_end_date,
      cpt: this.selectedValueCode,
      n_units: this.n_units,
    })
    this.pa_assessment = '';
    this.pa_assessment_start_date = null;
    this.pa_assessment_end_date = null;
    this.pa_services = '';
    this.pa_services_start_date = null;
    this.pa_services_end_date = null;
    this.selectedValueCode = null;
    this.n_units = 0;
  }

  deletePAAssestment(i:any){
    this.pa_assessmentgroup.splice(i,1);
  }

  //listas
  //files

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

  
  processFile($event:any){
    for (const file of $event.target.files){
      this.FILES.push(file);
    }
    // console.log(this.FILES);
  
  }

  deleteDocument(i:any){
    this.FILES.splice(i,1);
  }

  deleteFile(FILE:any){
    this.FilesAdded.splice(FILE,1);
    this.patientService.deleteLaboratory(FILE.id).subscribe((resp:any)=>{
      this.showUser();
    })
  }
  selectDoc(FILE:any){
    this.file_selected = FILE;
  }

  getDocumentIframe(url) {
    var document, results;

    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    document   = (results === null) ? url : results[1];

    return this._sanitizer.bypassSecurityTrustResourceUrl(document);
}

closeModalDoc(){

  $('#view-doc').hide();
      $("#view-doc").removeClass("show");
      $("#view-doc").css("display", "none !important");
      $(".modal").css("display", "none !important");
      $(".modal-backdrop").remove();
      $("body").removeClass();
      $("body").removeAttr("style");
      this.file_selected = null;
}
 



//files

//update function


saveFiles(){
  this.text_validation = '';
  if(!this.first_name ||!this.last_name || !this.client_id ){
    this.text_validation = 'Los campos con * son obligatorios';
    return;
  }


  // this.valid_form = false;
  let formData = new FormData();

  formData.append('patient_id', this.patient_id);
  
  this.FILES.forEach((file:any, index:number)=>{
    formData.append("files["+index+"]", file);
  });

  this.valid_form_success = false;
  this.text_validation = '';

  this.patientService.storeLaboratory(formData).subscribe((resp:any)=>{
    // console.log(resp);
    if(resp.message == 403){
      this.text_validation = resp.message_text;
      // Swal.fire('Error al eliminar', `resp.message_text`, 'error');
    }else{
      // this.text_success = "Patient Has updated";
      Swal.fire('Updated', ` Patient Has updated`, 'success');
      this.ngOnInit();
      // this.router.navigate(['/patients/list']);
    }
  })


}

  save(){
    this.text_validation = '';
    // if(!this.first_name ||!this.last_name || !this.client_id ){
    //   this.text_validation = 'Los campos con * son obligatorios';
    //   return;
    // }


    // this.valid_form = false;
    let formData = new FormData();

    formData.append('first_name', this.first_name);
    formData.append('last_name', this.last_name);
    formData.append('phone', this.phone);
    formData.append('home_phone', this.home_phone);
    formData.append('work_phone', this.work_phone);
    formData.append('gender', this.gender+'');
    formData.append('address', this.address);
    formData.append('zip', this.zip);
    
    formData.append('city', this.city);
    formData.append('state', this.state);
    formData.append('education', this.education);
    formData.append('profession', this.profession);
    formData.append('school_name', this.school_name);
    formData.append('school_number', this.school_number);
    formData.append('diagnosis_code', this.diagnosis_code);
    formData.append('age', this.age+'');
    // formData.append('rbt_home_id', this.selectedValue_rbt);
    // formData.append('rbt2_school_id', this.selectedValue_rbt2);
    // formData.append('bcba_home_id', this.selectedValue_bcba);
    // formData.append('bcba2_school_id', this.selectedValue_bcba2);
    formData.append('clin_director_id', this.selectedValue_clind);
    formData.append('pay', this.pay+'');
    formData.append('telehealth', this.telehealth+'');
    // formData.append('insurer', this.selectedValueInsurer);


    
    if(this.selectedValue_rbt ){
      formData.append('rbt_home_id', this.selectedValue_rbt);
    }
    if(this.selectedValue_rbt2 ){
      formData.append('rbt2_school_id', this.selectedValue_rbt2);
    }
    if(this.selectedValue_bcba ){
      formData.append('bcba_home_id', this.selectedValue_bcba);
    }
    if(this.selectedValue_bcba2 ){
      formData.append('bcba2_school_id', this.selectedValue_bcba2);
    }
    
    if(this.pa_assessmentgroup ){
      formData.append('pa_assessments', JSON.stringify(this.pa_assessmentgroup));
    }
    if(this.selectedValueLocation ){
      formData.append('location_id', this.selectedValueLocation);
    }
    
    if(this.selectedValueLocation){

      formData.append('insurer_id', this.selectedValueInsurer);
    }

    if(this.patient_id){

      formData.append('patient_id', this.patient_id);
    }
    
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
    // if(this.insurer_secundary){

    //   formData.append('insurer_secundary', this.insurer_secundary);
    // }
    // if(this.insuranceId_secundary){

    //   formData.append('insuranceId_secundary', this.insuranceId_secundary);
    // }
    
    if(this.elegibility_date){

      formData.append('elegibility_date', this.elegibility_date);
    }
    
    if(this.selectedValuePosCovered){
      formData.append('pos_covered', this.selectedValuePosCovered);
    
    }
    if(this.eqhlid){
      formData.append('eqhlid', this.eqhlid);
    
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

    if(this.selectedValueLocation ){
      formData.append('location_id', this.selectedValueLocation);
    }
    

    if(this.welcome){
      formData.append('welcome', this.welcome);
    }
    if(this.eligibility){
      formData.append('eligibility', this.eligibility);
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
    if(this.interview){
      formData.append('interview', this.interview);
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

    this.patientService.editPatient(formData, this.client_id).subscribe((resp:any)=>{
      // console.log(resp);
      if(resp.message == 403){
        this.text_validation = resp.message_text;
        // Swal.fire('Error al eliminar', `resp.message_text`, 'error');
      }else{
        // this.text_success = "Patient Has updated";
        Swal.fire('Updated', ` Patient Has updated`, 'success');
        this.ngOnInit();
        // this.router.navigate(['/patients/list']);
      }
    })


  }
//update function


// isCheckedTelehealth(){
//   this.telehealth = !this.telehealth;
//   console.log(this.telehealth);
//   // if ( event.target.checked ) {
//   // }
// }

//   isCheckedPay(){
//     this.pay = !this.pay;
//     console.log(this.pay);
//     // if ( event.target.checked ) {
//     // }
//   }
}
