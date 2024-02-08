import { Component, ElementRef, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/data/data.service';
import { patientProfile } from 'src/app/shared/models/models';
import { routes } from 'src/app/shared/routes/routes';
import { PatientMService } from '../service/patient-m.service';
import { DoctorService } from '../../doctors/service/doctor.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
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

constructor(
  public patientService : PatientMService,
  public activatedRoute: ActivatedRoute,
  public doctorService: DoctorService,
  )
{
}
ngOnInit(): void {
  window.scrollTo(0, 0);
  this.doctorService.closeMenuSidebar();
  this.activatedRoute.params.subscribe((resp:any)=>{
    // console.log(resp);
    this.patient_id = resp.id;
  });
  this.getPatient();
}

getPatient(){
  this.patientService.showPatientProfile(this.patient_id).subscribe((resp:any)=>{
    console.log(resp);
    this.appointments= resp.appointments;
    this.num_appointment= resp.num_appointment;
    this.money_of_appointments= resp.money_of_appointments;
    this.num_appointment_pendings= resp.num_appointment_pendings;
    this.patient_selected= resp.patient;
    // this.appointment_pendings= resp.appointment_pendings.data;
    this.pa_assessments= resp.patient.pa_assessments;


  })
}


  optionSelected(value:number){
    this.option_selected = value;
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
      pdf.save('client.pdf');
    });
  }
}
