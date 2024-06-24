import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../service/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent {
  public routes = routes;
  public selectedValue!: string;
  public selectedValueLocation!: string;

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

  
  constructor(
    public doctorService:DoctorService,
    public router: Router
  ){

  }

  ngOnInit(): void {
    // window.scrollTo(0, 0);
    this.doctorService.closeMenuSidebar();
    this.getConfig();
  }

  getConfig(){
    this.doctorService.listConfig().subscribe((resp:any)=>{
      // console.log(resp);
      this.roles = resp.roles;
      this.locations = resp.locations;
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
    if(!this.name||!this.email ||!this.surname ||!this.phone 
      ||!this.birth_date ||!this.address
    ){
      this.text_validation = 'Los campos con * son obligatorios';
      // return;
    }

    if(this.password != this.password_confirmation  ){
      this.text_validation = 'Las contraseña debe ser igual';
      // return;
    }
    


    // let formData = new FormData();
    // formData.append('name', this.name);
    // formData.append('surname', this.surname);
    // formData.append('phone', this.phone);
    // formData.append('email', this.email);
    // formData.append('password', this.password);
    // formData.append('birth_date', this.birth_date);
    // formData.append('gender', this.gender+'');
    
    // formData.append('address', this.address);
    // formData.append('role_id', this.selectedValue);
    // formData.append('location_id', this.selectedValueLocation);
    // formData.append('imagen', this.FILE_AVATAR);
    // formData.append('imagenn', this.FILE_SIGNATURE);
    
    // formData.append('currently_pay_through_company', this.currently_pay_through_company);
    // formData.append('llc', this.llc);
    // formData.append('ien', this.ien);
    // formData.append('wc', this.wc);
    // formData.append('agency_location', this.agency_location);
    // formData.append('city', this.city);
    // formData.append('languages', this.languages);
    // formData.append('ss_number', this.ss_number);
    // formData.append('date_of_hire', this.date_of_hire);
    // formData.append('start_pay', this.start_pay);
    // formData.append('driver_license_expiration', this.driver_license_expiration);
    // formData.append('cpr_every_2_years', this.cpr_every_2_years);
    // formData.append('background_every_5_years', this.background_every_5_years);
    // formData.append('e_verify', this.e_verify);
    // formData.append('national_sex_offender_registry', this.national_sex_offender_registry);
    // formData.append('certificate_number', this.certificate_number);
    // formData.append('bacb_license_expiration', this.bacb_license_expiration);
    // formData.append('liability_insurance_annually', this.liability_insurance_annually);
    // formData.append('local_police_rec_every_5_years', this.local_police_rec_every_5_years);
    // formData.append('npi', this.npi);
    // formData.append('medicaid_provider', this.medicaid_provider);

    // formData.append('ceu_hippa_annually', this.ceu_hippa_annually);
    // formData.append('ceu_security_awareness_annually', this.ceu_security_awareness_annually);
    // formData.append('ceu_domestic_violence_no_expiration', this.ceu_domestic_violence_no_expiration);
    // formData.append('ceu_zero_tolerance_every_3_years', this.ceu_zero_tolerance_every_3_years);
    // formData.append('ceu_hiv_bloodborne_pathogens_infection_control_no_expiration', this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration);
    // formData.append('ceu_civil_rights_no_expiration', this.ceu_civil_rights_no_expiration);

    // formData.append('school_badge', this.school_badge);
    // formData.append('w_9_w_4_form', this.w_9_w_4_form);
    // formData.append('contract', this.contract);
    // formData.append('two_four_week_notice_agreement', this.two_four_week_notice_agreement);
    // formData.append('credentialing_package_bcbas_only', this.credentialing_package_bcbas_only);
    // formData.append('caqh_bcbas_only', this.caqh_bcbas_only);
    // formData.append('contract_type', this.contract_type);
    // formData.append('salary', this.salary+'');
    // // formData.append('location_id', this.selectedValueLocation);

    // formData['locations_selected'] = this.locations_selected;

    let formData = {};
    formData['name'] = this.name;
    formData['surname'] = this.surname;
    formData['phone'] = this.phone;
    formData['email'] = this.email;
    formData['birth_date'] = this.birth_date;
    formData['gender'] = this.gender+'';

    // this.FILE_AVATAR  = this.IMAGE_PREVISUALIZA;
    


    if(this.FILE_AVATAR ){
      formData['imagen'] = this.FILE_AVATAR;
    }
    // this.FILE_SIGNATURE  = this.IMAGE_PREVISUALIZA_SIGNATURE;
    if(this.FILE_SIGNATURE ){
      formData['imagenn'] = this.FILE_SIGNATURE;
    }

    if(this.selectedValue ){
      formData['role_id'] = this.selectedValue;
    }
    // if(this.selectedValueLocation ){
    //   formData['location_id'] = this.selectedValueLocation;
    // }
    if(this.address ){
      formData['address'] = this.address;
    }
    
    if(this.password ){
      formData['password'] = this.password;
    }

    if(this.currently_pay_through_company ){
      formData['currently_pay_through_company'] = this.currently_pay_through_company;
    }
    if(this.llc ){
      formData['llc'] = this.llc;
    }
    if(this.ien ){
      formData['ien'] = this.ien;
    }
    if(this.wc ){
      formData['wc'] = this.wc;
    }
    if(this.agency_location ){
      formData['agency_location'] = this.agency_location;
    }
    if(this.city ){
      formData['city'] = this.city;
    }
    if(this.languages ){
      formData['languages'] = this.languages;
    }
    if(this.ss_number ){
      formData['ss_number'] = this.ss_number;
    }
    if(this.date_of_hire ){
      formData['date_of_hire'] = this.date_of_hire;
    }
    if(this.start_pay ){
      formData['start_pay'] = this.start_pay;
    }
    if(this.driver_license_expiration ){
      formData['driver_license_expiration'] = this.driver_license_expiration;
    }
    if(this.cpr_every_2_years ){
      formData['cpr_every_2_years'] = this.cpr_every_2_years;
    }
    if(this.background_every_5_years ){
      formData['background_every_5_years'] = this.background_every_5_years;
    }
    if(this.e_verify ){
      formData['e_verify'] = this.e_verify;
    }    
    if(this.national_sex_offender_registry ){
      formData['national_sex_offender_registry'] = this.national_sex_offender_registry;
    }    
    if(this.certificate_number ){
      formData['certificate_number'] = this.certificate_number;
    }    
    if(this.bacb_license_expiration ){
      formData['bacb_license_expiration'] = this.bacb_license_expiration;
    }    
    if(this.liability_insurance_annually ){
      formData['liability_insurance_annually'] = this.liability_insurance_annually;
    }    
    if(this.local_police_rec_every_5_years ){
      formData['local_police_rec_every_5_years'] = this.local_police_rec_every_5_years;
    }    
    if(this.npi ){
      formData['npi'] = this.npi;
    }    
    if(this.medicaid_provider ){
      formData['medicaid_provider'] = this.medicaid_provider;
    }    
    if(this.ceu_hippa_annually ){
      formData['ceu_hippa_annually'] = this.ceu_hippa_annually;
    }    
    if(this.ceu_domestic_violence_no_expiration ){
      formData['ceu_domestic_violence_no_expiration'] = this.ceu_domestic_violence_no_expiration;
    }    
    if(this.ceu_security_awareness_annually ){
      formData['ceu_security_awareness_annually'] = this.ceu_security_awareness_annually;
    }    
    if(this.ceu_zero_tolerance_every_3_years ){
      formData['ceu_zero_tolerance_every_3_years'] = this.ceu_zero_tolerance_every_3_years;
    }    
    if(this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration ){
      formData['ceu_hiv_bloodborne_pathogens_infection_control_no_expiration'] = this.ceu_hiv_bloodborne_pathogens_infection_control_no_expiration;
    }    
    if(this.ceu_civil_rights_no_expiration ){
      formData['ceu_civil_rights_no_expiration'] = this.ceu_civil_rights_no_expiration;
    }    
    if(this.school_badge ){
      formData['school_badge'] = this.school_badge;
    }    
    if(this.w_9_w_4_form ){
      formData['w_9_w_4_form'] = this.w_9_w_4_form;
    }    
    if(this.contract ){
      formData['contract'] = this.contract;
    }    
    if(this.two_four_week_notice_agreement ){
      formData['two_four_week_notice_agreement'] = this.two_four_week_notice_agreement;
    }    
    if(this.credentialing_package_bcbas_only ){
      formData['credentialing_package_bcbas_only'] = this.credentialing_package_bcbas_only;
    }    
    if(this.caqh_bcbas_only ){
      formData['caqh_bcbas_only'] = this.caqh_bcbas_only;
    }    
    if(this.contract_type ){
      formData['contract_type'] = this.contract_type;
    }    
    if(this.salary ){
      formData['salary'] = this.salary+'';
    }    
    formData['locations_selected'] = this.locations_selected;
    
    this.doctorService.storeDoctor(formData).subscribe((resp:any)=>{
      // console.log(resp);
      
      if(resp.status == 500){
        this.text_validation = resp.message_text;
        Swal.fire('Warning', resp.message_text, 'warning');
      }if(resp.message == 403){
        this.text_validation = resp.message_text;
        Swal.fire('Warning', resp.message_text, 'warning');
      }else{
        // this.text_success = 'Employer created';
        // this.ngOnInit();
        Swal.fire('Created', `Employee Created successfully!`, 'success');
        this.router.navigate(['/doctors/list']);
      }
    })


  }

 
}
