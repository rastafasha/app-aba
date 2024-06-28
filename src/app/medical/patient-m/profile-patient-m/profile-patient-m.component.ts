import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { PatientMService } from '../service/patient-m.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';
import { InsuranceService } from '../../insurance/service/insurance.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RolesService } from '../../roles/service/roles.service';
import { Location } from '@angular/common';

declare var $:any;  


@Component({
  selector: 'app-profile-patient-m',
  templateUrl: './profile-patient-m.component.html',
  styleUrls: ['./profile-patient-m.component.scss']
})
export class ProfilePatientMComponent {
  public routes = routes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
public patientProfile: any[];
option_selected:number = 1;
public patient_id: any;

public num_appointment: number = 0;
public money_of_appointments: number = 0;
public num_appointment_pendings: number = 0;
public patient_selected: any;
public appointment_pendings: any =[];
public appointments: any =[];
public pa_assessments: any =[];


public text_success:string = '';
public text_validation:string = '';

imagenSerUrl = environment.url_media;
public pa_assessmentgroup: any= [];
public pa_assessmentss: any = <any>[];

FILES:any = [];
FilesAdded:any = [];
public file_selected:any;

public specialists:any = [];
  public locations:any = [];
  public insurances:any = [];
  public insurance_id:any ;
  public roles_rbt:any ;
  public roles_bcba:any ;
  public insuranceiddd:any ;
  public insurer_name:any ;

  public rbt_id: any;
  public rbt2_id: any;
  public bcba_id: any;
  public bcba2_id: any;
  public clin_director_id: any;
  public client_id: any;
  public avatar: any;
  public user: any;

  doctor_selected:any =null;
  doctor_selected_full_name:any =null;
  doctor_selected_rbt:any =null;
  doctor_selected_full_name_rbt:any =null;
  doctor_selected_bcba:any =null;
  doctor_selected_full_name_bcba:any =null;
  doctor_selected_clin_director:any =null;
  doctor_selected_full_name_clin_director:any =null;
  doctor_selected_bcba2:any =null;
  doctor_selected_full_name_bcba2:any =null;
  doctor_selected_rbt2:any =null;
  doctor_selected_full_name_rbt2:any =null;

  public doctor_id:any ;
  public location_id:any ;

constructor(
  public patientService : PatientMService,
  public activatedRoute: ActivatedRoute,
  public doctorService: DoctorService,
  public insuranceService: InsuranceService,
  private _sanitizer: DomSanitizer,
  private roleService: RolesService,
  private location: Location,
  )
{
}
ngOnInit(): void {
  window.scrollTo(0, 0);
  this.doctorService.closeMenuSidebar();
  this.activatedRoute.params.subscribe((resp:any)=>{
    // console.log(resp);
    this.client_id = resp.id;
  });
  this.getPatient();
  this.getConfig();
  this.user = this.roleService.authService.user;

  let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;
    this.location_id = this.user.location_id;
}

goBack() {
  this.location.back(); // <-- go back to previous location on cancel
  
}

isPermission(permission:string){
  if(this.user.roles.includes('SUPERADMIN')){
    return true;
  }
  if(this.user.permissions.includes(permission)){
    return true;
  }
  return false;
}

getConfig(){
  this.patientService.listConfig(this.location_id).subscribe((resp:any)=>{
    this.specialists = resp.specialists;
    this.insurances = resp.insurances;
    this.insurance_id = resp.insurances.length > 0 ? resp.insurances[0].id : '';
    this.locations = resp.locations;
    
    this.insuranceService.showInsurance(this.insurance_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.insuranceiddd= resp.id;
      this.insurer_name = resp.insurer_name;

      
    })
  })
}



getPatient(){
  this.patientService.showPatientProfile(this.client_id).subscribe((resp:any)=>{
    console.log(resp);
    this.appointments= resp.appointments;
    this.num_appointment= resp.num_appointment;
    this.money_of_appointments= resp.money_of_appointments;
    this.num_appointment_pendings= resp.num_appointment_pendings;
    this.patient_selected= resp.patient;
    this.patient_id= resp.patient.patient_id;
    this.avatar= resp.patient.avatar;
    this.rbt_id = resp.patient.rbt_home_id;
    this.rbt2_id = resp.patient.rbt2_school_id;
    this.bcba_id = resp.patient.bcba_home_id;
    this.bcba2_id = resp.patient.bcba2_school_id;
    this.clin_director_id = resp.patient.clin_director_id;
    // this.appointment_pendings= resp.appointment_pendings.data;
    this.pa_assessmentss = resp.pa_assessments;
        let jsonObj = JSON.parse(this.pa_assessmentss) || '';
        this.pa_assessmentgroup = jsonObj;

        this.patientService.getLaboratoryByPatient(this.patient_id).subscribe((resp:any)=>{
          // console.log(resp);
          this.FilesAdded = resp.patientFiles.data;
        })

        this.getDoctorRbt1();
        this.getDoctorRbt2();
        this.getDoctorBcba();
        this.getDoctorBcba2();
        this.getDoctorDirector();
  })
}

getDoctorRbt1(){
  this.doctorService.showDoctor(this.rbt_id).subscribe((resp:any)=>{
    this.doctor_selected_rbt = resp.user;
    this.doctor_selected_full_name_rbt = resp.user.full_name;
  });
}

getDoctorRbt2(){
  this.doctorService.showDoctor(this.rbt2_id).subscribe((resp:any)=>{
    // console.log(resp);
    this.doctor_selected_rbt2 = resp.user;
    this.doctor_selected_full_name_rbt2 = resp.user.full_name;
  });
}
getDoctorBcba(){
  this.doctorService.showDoctor(this.bcba_id).subscribe((resp:any)=>{
    // console.log(resp);
    this.doctor_selected_bcba = resp.user;
    this.doctor_selected_full_name_bcba = resp.user.full_name;
  });
}
getDoctorBcba2(){
  this.doctorService.showDoctor(this.bcba2_id).subscribe((resp:any)=>{
    // console.log(resp);
    this.doctor_selected_bcba2 = resp.user;
    this.doctor_selected_full_name_bcba2 = resp.user.full_name;
  });
}
getDoctorDirector(){
  this.doctorService.showDoctor(this.clin_director_id).subscribe((resp:any)=>{
    // console.log(resp);
    this.doctor_selected_clin_director = resp.user;
    this.doctor_selected_full_name_clin_director = resp.user.full_name;
  });
}


  optionSelected(value:number){
    this.option_selected = value;
  }

  // public convertToPdf(): void {
  //   const data = this.contentToConvert.nativeElement;
  //   html2canvas(data).then(canvas => {
  //     // Few necessary setting options
  //     const imgWidth = 208;
  //     const pageHeight = 295;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     const heightLeft = imgHeight;

  //     // Create a new PDF document
  //     const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

  //     // Add an image of the canvas to the PDF
  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

  //     // Save the PDF
  //     pdf.save('client_'+this.patient_selected.first_name+'_'+this.patient_selected.last_name+".pdf");
  //   });
  // }


  public convertToPdf(): void {
    const data = this.contentToConvert.nativeElement;
  
      html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
  
      // Create a new PDF document
      const pdf = new jspdf.jsPDF('p', 'mm');
      var position = 0;
  
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      // Save the PDF
      pdf.save('client_'+this.patient_selected.first_name+'_'+this.patient_selected.last_name+".pdf");
    });
  
      
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
}
