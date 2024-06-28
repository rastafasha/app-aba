import { Component, ElementRef, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../service/doctor.service';
import { ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { RolesService } from '../../roles/service/roles.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile-doctor.component.html',
  styleUrls: ['./profile-doctor.component.scss']
})
export class ProfileDoctorComponent {
  public routes = routes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  option_selected:number = 1;
  public doctorProfile: any[];

public doctor_id: any;

public num_appointment: number = 0;
public money_of_appointments: number = 0;
public num_appointment_pendings: number = 0;
public doctor_selected: any;
public patient_id: any;
public maladaptive_behavior: any;
public graphData: any;
public maladaptives: any;
public total_notes_bips: number;
public total_notes_bcbas: number;
public total_notes_rbts: number;
public appointment_pendings: any =[];
public appointments: any =[];
public notes_bcbas: any =[];
public notes_rbts: any =[];
public patients: any =[];
public locations: any =[];
name:string='';
surname:string='';
mobile:string='';
email:string='';
address:string='';
password:string='';
password_repeat:string='';

public text_success:string = '';
public text_validation:string = '';

public user:any;
  public roles:any = [];

constructor(
  public doctorService: DoctorService,
  public roleService: RolesService,
  public activatedRoute: ActivatedRoute,
  public location: Location,
  )
{
}

ngOnInit(): void {
  window.scrollTo(0, 0);
  this.doctorService.closeMenuSidebar();
  this.activatedRoute.params.subscribe((resp:any)=>{
    // console.log(resp);
    this.doctor_id = resp.id;
  });
  this.getDoctor();

  let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.roles = this.user.roles[0];
    
    this.user = this.roleService.authService.user;
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

getDoctor(){
  this.doctorService.showDoctorProfile(this.doctor_id).subscribe((resp:any)=>{
    console.log(resp);
    this.doctor_selected= resp.doctor;
    this.locations= resp.doctor.locations.data;
    console.log(this.locations);
    // this.num_appointment= resp.num_appointment;
    // this.money_of_appointments= resp.money_of_appointments;
    // this.num_appointment_pendings= resp.num_appointment_pendings;
    // this.appointment_pendings= resp.appointment_pendings.data;
    // this.appointments= resp.appointments;

    this.name= this.doctor_selected.name;
    this.surname= this.doctor_selected.surname;
    this.mobile= this.doctor_selected.mobile;
    this.email= this.doctor_selected.email;
    this.address= this.doctor_selected.address;
    this.notes_bcbas= resp.notes_bcbas;
    this.notes_rbts= resp.notes_rbts;
    this.patients= resp.patients;
    this.total_notes_bips= resp.total_notes_bips;
    this.total_notes_bcbas= resp.total_notes_bcbas;
    this.total_notes_rbts= resp.total_notes_rbts;


  })
}




  optionSelected(value:number){
    this.option_selected = value;
  }

  update(){
    this.text_validation = '';
    this.text_success = '';
    if(!this.name||!this.email ||!this.surname ){
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    if(this.password ){
      if(this.password != this.password_repeat  ){
        this.text_validation = 'Las contraseña debe ser igual';
        return;
      }
    }

    let data:any ={
      name: this.name,
      surname: this.surname,
      mobile: this.mobile,
      email: this.email,
      address: this.address,
    }

    if(this.password){
      data.password = this.password
    }
    this.doctorService.editDoctorProfile(data, this.doctor_id).subscribe((resp:any)=>{
      // console.log(resp);
      
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = 'El usuario ha sido actualizado correctamente';
        this.ngOnInit();
      }
    })
  }


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
      pdf.save('employee_'+this.doctor_selected.name+'_'+this.doctor_selected.surname+".pdf");
    });
  
      
  }
}
