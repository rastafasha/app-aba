import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../service/doctor.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent {
  public routes = routes;
  public selectedValue!: string;

  public name: string = '';
  public surname: string = '';
  public phone: any;
  public email: string = '';
  public password: string = '';
  public password_confirmation: string = '';
  public birth_date: string = '';
  public gender: number = 1;
  public education: string = '';
  public designation: string = '';
  public address: string = '';

  public currently_pay_through_company: string = '';
  public llc: string = '';
  public ien: string = '';
  public wc: string = '';
  public electronic_signature: string = '';
  public agency_location: string = '';
  public city: string = '';
  public languages: string = '';
  public dob: string = '';
  public ss_number: string = '';
  public date_of_hire: string = '';
  public start_pay: string = '';
  public driver_license_expiration: string = '';
  public cpr_every_2_years: string = '';
  public background_every_5_years: string = '';
  public e_verify: string = '';
  public national_sex_offender_registry: string = '';
  public certificate_number: string = '';
  public bacb_license_expiration: string = '';
  public liability_insurance_annually: string = '';
  public local_police_rec_every_5_years: string = '';
  public npi: string = '';
  public medicaid_provider: string = '';

  public ceu_hippa_annually: string = '';
  public ceu_domestic_violence_no_expiration: string = '';
  public ceu_security_awareness_annually: string = '';
  public ceu_zero_tolerance_every_3_years: string = '';
  public ceu_hiv_bloodborne_pathogens_infection_control_no_expiration: string = '';
  public ceu_civil_rights_no_expiration: string = '';
  
  public school_badge: string = '';
  public w_9_w_4_form: string = '';
  public contract: string = '';
  public two_four_week_notice_agreement: string = '';
  public credentialing_package_bcbas_only: string = '';
  public caqh_bcbas_only: string = '';
  public contract_type: string = '';
  public salary: number = 0;

  public roles:any = [];
  public locations:any = [];
  
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any = 'assets/img/user-06.jpg';

  public FILE_SIGNATURE:any;
  public IMAGE_PREVISUALIZA_SIGNATURE:any = 'assets/img/user-06.jpg';

  valid_form:boolean = false;
  valid_form_success:boolean = false;

  public text_success:string = '';
  public text_validation:string = '';
  public locations_selected: number[] = [];

 
  public doctor_id:any;
  public doctor_selected:any;

  constructor(
    public doctorService:DoctorService,
    public router: Router,
    public activatedRoute:ActivatedRoute,
    public location: Location,
  ){

  }

  ngOnInit(): void {
    // window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe((resp:any)=>{
      // console.log(resp);
      this.doctor_id = resp.id;
    });

    this.getConfig();
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getConfig(){
    this.doctorService.listConfig().subscribe((resp:any)=>{
      // console.log(resp);
      this.roles = resp.roles;
      this.locations = resp.locations;

      this.doctorService.showDoctor(this.doctor_id).subscribe((resp:any)=>{
        this.locations_selected = resp.locations || [];
        this.doctor_selected = resp.user;

        this.selectedValue = this.doctor_selected.roles.id;
        this.name = this.doctor_selected.name;
        this.surname = this.doctor_selected.surname;
        this.phone = this.doctor_selected.phone;
        this.email = this.doctor_selected.email;
        this.birth_date = new Date(this.doctor_selected.birth_date).toISOString();
        this.education = this.doctor_selected.education;
        this.designation = this.doctor_selected.designation;
        this.gender = this.doctor_selected.gender;
        this.address = this.doctor_selected.address;
        this.IMAGE_PREVISUALIZA = this.doctor_selected.avatar;
        this.IMAGE_PREVISUALIZA_SIGNATURE = this.doctor_selected.electronic_signature;
        
        
        this.currently_pay_through_company = this.doctor_selected.currently_pay_through_company;
        this.llc = this.doctor_selected.llc;
        this.ien = this.doctor_selected.ien;
        this.wc = this.doctor_selected.wc;
        
        this.agency_location = this.doctor_selected.agency_location;
        this.city = this.doctor_selected.city;
        this.languages = this.doctor_selected.languages;
        this.ss_number = this.doctor_selected.ss_number;
        this.date_of_hire = new Date(this.doctor_selected.date_of_hire).toISOString();
        this.start_pay = new Date(this.doctor_selected.start_pay).toISOString();
        this.driver_license_expiration = new Date(this.doctor_selected.driver_license_expiration).toISOString();
        this.cpr_every_2_years = this.doctor_selected.cpr_every_2_years;
        this.background_every_5_years = this.doctor_selected.background_every_5_years;
        this.e_verify = this.doctor_selected.e_verify;
        this.national_sex_offender_registry = this.doctor_selected.national_sex_offender_registry;
        this.certificate_number = this.doctor_selected.certificate_number;
        this.bacb_license_expiration = new Date(this.doctor_selected.bacb_license_expiration).toISOString();
        this.liability_insurance_annually = this.doctor_selected.liability_insurance_annually;
        this.local_police_rec_every_5_years = this.doctor_selected.local_police_rec_every_5_years;
        this.npi = this.doctor_selected.npi;
        this.medicaid_provider = this.doctor_selected.medicaid_provider;

        this.ceu_hippa_annually = this.doctor_selected.ceu_hippa_annually;
        this.ceu_domestic_violence_no_expiration = this.doctor_selected.ceu_domestic_violence_no_expiration;
        this.ceu_security_awareness_annually = this.doctor_selected.ceu_security_awareness_annually;
        this.ceu_zero_tolerance_every_3_years = this.doctor_selected.ceu_zero_tolerance_every_3_years;
        this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration = this.doctor_selected.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration;
        this.ceu_civil_rights_no_expiration = this.doctor_selected.ceu_civil_rights_no_expiration;

        this.school_badge = this.doctor_selected.school_badge;
        this.w_9_w_4_form = this.doctor_selected.w_9_w_4_form;
        this.contract = this.doctor_selected.contract;
        this.two_four_week_notice_agreement = this.doctor_selected.two_four_week_notice_agreement;
        this.credentialing_package_bcbas_only = this.doctor_selected.credentialing_package_bcbas_only;
        this.caqh_bcbas_only = this.doctor_selected.caqh_bcbas_only;
        this.contract_type = this.doctor_selected.contract_type;
        this.salary = this.doctor_selected.salary;
      })
      
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

  loadFileSignature($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE = $event.target.files[0];
    let reader2 = new FileReader();
    reader2.readAsDataURL(this.FILE_SIGNATURE);
    reader2.onloadend = ()=> this.IMAGE_PREVISUALIZA_SIGNATURE = reader2.result;
  }

  

  save(){
    this.text_validation = '';
    this.text_success = '';
    if(!this.name||!this.email ||!this.surname ){
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    if(this.password ){
      if(this.password != this.password_confirmation  ){
        this.text_validation = 'Las contraseña debe ser igual';
        return;
      }
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('phone', this.phone);
    formData.append('email', this.email);
    formData.append('birth_date', this.birth_date);
    formData.append('gender', this.gender+'');

    if(this.FILE_AVATAR ){
      formData.append('imagen', this.FILE_AVATAR);
    }
    if(this.FILE_SIGNATURE ){
      formData.append('imagenn', this.FILE_SIGNATURE);
    }

    if(this.selectedValue ){
      formData.append('role_id', this.selectedValue);
    }
    if(this.address ){
      formData.append('address', this.address);
    }
    
    if(this.password ){
      formData.append('password', this.password);
    }

    if(this.currently_pay_through_company ){
      formData.append('currently_pay_through_company', this.currently_pay_through_company);
    }
    if(this.llc ){
      formData.append('llc', this.llc);
    }
    if(this.ien ){
      formData.append('ien', this.ien);
    }
    if(this.wc ){
      formData.append('wc', this.wc);
    }
    if(this.agency_location ){
      formData.append('agency_location', this.agency_location);
    }
    if(this.city ){
      formData.append('city', this.city);
    }
    if(this.languages ){
      formData.append('languages', this.languages);
    }
    if(this.ss_number ){
      formData.append('ss_number', this.ss_number);
    }
    if(this.date_of_hire ){
      formData.append('date_of_hire', this.date_of_hire);
    }
    if(this.start_pay ){
      formData.append('start_pay', this.start_pay);
    }
    if(this.driver_license_expiration ){
      formData.append('driver_license_expiration', this.driver_license_expiration);
    }
    if(this.cpr_every_2_years ){
      formData.append('cpr_every_2_years', this.cpr_every_2_years);
    }
    if(this.background_every_5_years ){
      formData.append('background_every_5_years', this.background_every_5_years);
    }
    if(this.e_verify ){
      formData.append('e_verify', this.e_verify);
    }    
    if(this.national_sex_offender_registry ){
      formData.append('national_sex_offender_registry', this.national_sex_offender_registry);
    }    
    if(this.certificate_number ){
      formData.append('certificate_number', this.certificate_number);
    }    
    if(this.bacb_license_expiration ){
      formData.append('bacb_license_expiration', this.bacb_license_expiration);
    }    
    if(this.liability_insurance_annually ){
      formData.append('liability_insurance_annually', this.liability_insurance_annually);
    }    
    if(this.local_police_rec_every_5_years ){
      formData.append('local_police_rec_every_5_years', this.local_police_rec_every_5_years);
    }    
    if(this.npi ){
      formData.append('npi', this.npi);
    }    
    if(this.medicaid_provider ){
      formData.append('medicaid_provider', this.medicaid_provider);
    }    
    if(this.ceu_hippa_annually ){
      formData.append('ceu_hippa_annually', this.ceu_hippa_annually);
    }    
    if(this.ceu_domestic_violence_no_expiration ){
      formData.append('ceu_domestic_violence_no_expiration', this.ceu_domestic_violence_no_expiration);
    }    
    if(this.ceu_security_awareness_annually ){
      formData.append('ceu_security_awareness_annually', this.ceu_security_awareness_annually);
    }    
    if(this.ceu_zero_tolerance_every_3_years ){
      formData.append('ceu_zero_tolerance_every_3_years', this.ceu_zero_tolerance_every_3_years);
    }    
    if(this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration ){
      formData.append('ceu_hiv_bloodborne_pathogens_infection_control_no_expiration', this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration);
    }    
    if(this.ceu_civil_rights_no_expiration ){
      formData.append('ceu_civil_rights_no_expiration', this.ceu_civil_rights_no_expiration);
    }    
    if(this.school_badge ){
      formData.append('school_badge', this.school_badge);
    }    
    if(this.w_9_w_4_form ){
      formData.append('w_9_w_4_form', this.w_9_w_4_form);
    }    
    if(this.contract ){
      formData.append('contract', this.contract);
    }    
    if(this.two_four_week_notice_agreement ){
      formData.append('two_four_week_notice_agreement', this.two_four_week_notice_agreement);
    }    
    if(this.credentialing_package_bcbas_only ){
      formData.append('credentialing_package_bcbas_only', this.credentialing_package_bcbas_only);
    }    
    if(this.caqh_bcbas_only ){
      formData.append('caqh_bcbas_only', this.caqh_bcbas_only);
    }    
    if(this.contract_type ){
      formData.append('contract_type', this.contract_type);
    }    
    if(this.salary ){
      formData.append('salary', this.salary+'');
    }
    let locations = '';
    this.locations_selected.forEach((location,index) => {
      if(index != 0) {
        locations += `,${location.toString()}`
      }
      else {
        locations += location.toString();
      }
    })
    formData.append('locations_selected', locations);
    
    this.doctorService.editDoctor(formData, this.doctor_id).subscribe((resp:any)=>{
      // console.log(resp);
      
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        // this.text_success = 'El usuario ha sido actualizado correctamente';
        Swal.fire('Updated', ` Employee Has updated`, 'success');
        this.ngOnInit();
      }
    })


  }

}