import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { InsuranceService } from '../../insurance/service/insurance.service';
import { BipService } from '../../bip/service/bip.service';
import { NoteBcbaService } from '../services/note-bcba.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-note-bcba-view',
  templateUrl: './note-bcba-view.component.html',
  styleUrls: ['./note-bcba-view.component.scss']
})
export class NoteBcbaViewComponent {
  public routes = routes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
public patientProfile: any[];
option_selected:number = 1;
public patient_id: any;
// option_selected:number = 0;

public selectedValueProvider!: string;
  public selectedValueRBT!: string;
  public selectedValueBCBA!: string;
  public selectedValueTimeIn!: number;
  public selectedValueTimeOut!: number;
  public selectedValueTimeIn2!: number;
  public selectedValueTimeOut2!: number;
  public selectedValueProviderName!: string;
  public selectedValueMaladaptive!: string;
  public selectedValueAba!: string;
  public selectedValueRendering!: string;

  client_id:any;
  doctor_id:any;
  patient_selected:any;
  client_selected:any;
  note_selected:any;
  bip_id:any;
  user:any;
  
  public first_name:string = '';
  public last_name:string = '';
  public diagnosis_code:string = '';
  
  public provider_name_g:string = '';
  public provider_credential:string = '';
  public pos:string = '';
  public session_date:string = '';
  public time_in:string = '';
  public time_out:string = '';
  public time_in2:string = '';
  public time_out2:string = '';
  public session_length_total:string = '';
  public session_length_total2:string = '';
  public environmental_changes:string = '';
  
  public sumary_note:string = '';
  public meet_with_client_at:string = '';
  public client_appeared:string = '';
  public as_evidenced_by:string = '';
  public rbt_modeled_and_demonstrated_to_caregiver:string = '';
  public client_response_to_treatment_this_session:string = '';
  public progress_noted_this_session_compared_to_previous_session:string = '';
  public next_session_is_scheduled_for:string = '';
  public provider_name:string = '';
  public supervisor_name:string = '';

  public number_of_occurrences:number = 0;
  public number_of_correct_responses:number = 0;
  public total_trials:number = 0;
  public number_of_correct_response:number = 0;
  public maladaptive:string = '';
  public replacement:string = '';
  public maladaptive_behavior:string = '';
  public interventions:any;
  public provider_signature:any;
  public supervisor_signature:any;
  
  
  public pairing:any;
  public response_block:any;
  public DRA:any;
  public DRO:any;
  public redirection:any;
  public errorless_teaching:any;
  public NCR:any;
  public shaping:any;
  public chaining:any;
  public token_economy:any;
  public extinction:any;
  public natural_teaching:any;

  public FILE_SIGNATURE_RBT:any;
  public IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED:any = 'assets/img/user-06.jpg';
  public FILE_SIGNATURE_BCBA:any;
  public IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED:any = 'assets/img/user-06.jpg';

  public rbt_id: any;
  public bcba_id: any;
  public maladaptivename: any;
  public replacementName: any;
  public note_rbt_id: any;
  public goal: any;
  public note_id: any;
  public note_selectedId: any;

  public roles_rbt:any = [];
  public roles_bcba:any = [];

  public hours_days:any =[];
  public maladaptives:any =[];
  public replacementGoals:any =[];
  public intervention_added:any =[];
  public replacements:any =[];
  public interventionsgroup:any =[];

  public maladaptivegroup:any =[];
  public replacementgroup:any =[];

  maladaptiveSelected:any =null;
  replacementSelected:any =null;

  note_description:any ;
  caregivers_training_goals:any =[];
  rbt_training_goals:any =[];
  rbt_training_goalsgroup:any =[];
  caregivers_training_goalsgroup:any =[];
  aba_supervisor:any =[];

  public location: any;
  public birth_date: any;
  public porcent_of_occurrences:number = 0;
  public porcent_of_correct_response:number = 0;
  lto:any =null;
  caregiver_goal:any =null;
  cpt_code:any =null;
  doctor_selected:any =null;
  doctor_selected_full_name:any =null;
  doctor_selected_rbt:any =null;
  doctor_selected_full_name_rbt:any =null;
  doctor_selected_bcba:any =null;
  doctor_selected_full_name_bcba:any =null;

constructor(
  public noteBcbaService : NoteBcbaService,
  public activatedRoute: ActivatedRoute,
  public doctorService: DoctorService,
  public insuranceService: InsuranceService,
  public bipService:BipService,
  public locations:Location,
  )
{
}
ngOnInit(): void {
  window.scrollTo(0, 0);
  this.doctorService.closeMenuSidebar();
  this.activatedRoute.params.subscribe((resp:any)=>{
    // console.log(resp);
    this.note_id = resp.id;
  });
  this.getConfig();
  this.getNote();
}

goBack() {
  this.locations.back(); // <-- go back to previous location on cancel
}

getConfig(){
  this.noteBcbaService.listConfigNote().subscribe((resp:any)=>{
    console.log(resp);
    
  })
}

getNote(){
  this.noteBcbaService.getNote(this.note_id).subscribe((resp:any)=>{
    console.log(resp);
    this.note_selected = resp.noteBcba;
      this.note_selectedId = resp.noteBcba.id;
      this.patient_id = this.note_selected.patient_id;
      this.bip_id = this.note_selected.bip_id;
      this.location = this.note_selected.location;
      // this.birth_date = this.note_selected.birth_date;
      this.birth_date = this.note_selected.birth_date ? new Date(this.note_selected.birth_date).toISOString(): '';

      this.provider_credential = this.note_selected.provider_credential;
      this.as_evidenced_by = this.note_selected.as_evidenced_by;
      this.client_appeared = this.note_selected.client_appeared;
      this.diagnosis_code = this.note_selected.diagnosis_code;
      this.cpt_code = this.note_selected.cpt_code;
      this.note_description = this.note_selected.note_description;
      this.client_response_to_treatment_this_session = this.note_selected.client_response_to_treatment_this_session;
      this.pos = this.note_selected.pos;

      this.session_length_total = this.note_selected.session_length_total;
    this.session_length_total2 = this.note_selected.session_length_total2;
    
    this.selectedValueTimeIn = this.note_selected.time_in;
    this.selectedValueTimeOut = this.note_selected.time_in2;
    this.selectedValueTimeIn2 = this.note_selected.time_out;
    this.selectedValueTimeOut2 = this.note_selected.time_out2;
      
      
      this.caregivers_training_goalsgroup = resp.caregiver_goals;
      let jsonObj = JSON.parse(this.caregivers_training_goalsgroup) || '';
      this.caregivers_training_goals = jsonObj;
      console.log(this.caregivers_training_goals);

      
      this.rbt_training_goalsgroup = resp.rbt_training_goals;
      let jsonObj1 = JSON.parse(this.rbt_training_goalsgroup) || '';
      this.rbt_training_goals = jsonObj1;
      console.log(this.rbt_training_goals);

      this.aba_supervisor = resp.noteBcba.aba_supervisor;
      this.selectedValueRendering = resp.noteBcba.rendering_provider;


      this.selectedValueProviderName = this.note_selected.provider_name_g;
      this.selectedValueRBT = this.note_selected.provider_name;
      this.selectedValueBCBA = this.note_selected.supervisor_name;

      this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED = this.note_selected.provider_signature;
      this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED = this.note_selected.supervisor_signature;

    this.getProfileBip();
    this.getDoctor();
    this.getDoctorRbt();
    this.getDoctorBcba();
  })
}


getDoctor(){
  this.doctorService.showDoctor(this.selectedValueRendering).subscribe((resp:any)=>{
    console.log(resp);
    this.doctor_selected = resp.user;
    this.doctor_selected_full_name = resp.user.full_name;
  });
}

getDoctorRbt(){
  this.doctorService.showDoctor(this.aba_supervisor).subscribe((resp:any)=>{
    console.log(resp);
    this.doctor_selected_rbt = resp.user;
    this.doctor_selected_full_name_rbt = resp.user.full_name;
  });
}
getDoctorBcba(){
  this.doctorService.showDoctor(this.selectedValueBCBA).subscribe((resp:any)=>{
    console.log(resp);
    this.doctor_selected_bcba = resp.user;
    this.doctor_selected_full_name_bcba = resp.user.full_name;
  });
}

getProfileBip(){
  this.bipService.getBipProfilePatient_id(this.patient_id).subscribe((resp:any)=>{
    console.log(resp);
    this.patient_selected = resp.patient;

    this.first_name = this.patient_selected.patient.first_name;
    this.last_name = this.patient_selected.patient.last_name;
    this.patient_id = resp.patient.patient_id;
    // console.log(this.patient_id);  
    this.diagnosis_code = this.patient_selected.patient.diagnosis_code;  
    
  });
}



  optionSelected(value:number){
    this.option_selected = value;
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
      pdf.save('note_bcba_client_'+this.patient_selected.patient_id+".pdf");
      // pdf.save('note_rbt_client_'+this.patient_selected.patient_id+'_'+this.patient_selected.last_name+".pdf");
    });

      
  }
  // public convertToPdf(): void {
  //   const data = this.contentToConvert.nativeElement;
  //   html2canvas(data).then(canvas => {
  //     // Few necessary setting options
  //     const imgWidth = 208;
  //     const pageHeight = 695;
  //     const imgHeight = canvas.height * imgWidth / canvas.width;
  //     const heightLeft = imgHeight;

  //     // Create a new PDF document
  //     const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

  //     // Add an image of the canvas to the PDF
  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

  //     // Save the PDF
  //     pdf.save('note_rbt_client_'+this.patient_selected.patient_id+".pdf");
  //     // pdf.save('note_rbt_client_'+this.patient_selected.patient_id+'_'+this.patient_selected.last_name+".pdf");
  //   });
  // }
}

