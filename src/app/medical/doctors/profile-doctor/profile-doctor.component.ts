import { Component, ElementRef, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/shared/data/data.service';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../service/doctor.service';
import { ActivatedRoute } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
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
public appointment_pendings: any =[];
public appointments: any =[];
name:string='';
surname:string='';
mobile:string='';
email:string='';
address:string='';
password:string='';
password_repeat:string='';

public text_success:string = '';
public text_validation:string = '';


constructor(
  public doctorService: DoctorService,
  public activatedRoute: ActivatedRoute,
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
}

getDoctor(){
  this.doctorService.showDoctorProfile(this.doctor_id).subscribe((resp:any)=>{
    console.log(resp);
    this.doctor_selected= resp.doctor;
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
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      // Create a new PDF document
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

      // Add an image of the canvas to the PDF
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

      // Save the PDF
      pdf.save('employee.pdf');
    });
  }
    
}
