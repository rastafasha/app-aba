import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { InsuranceService } from '../../insurance/service/insurance.service';
import { NoteRbtService } from '../services/note-rbt.service';
import { BipService } from '../../bip/service/bip.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-note-rbt-view',
  templateUrl: './note-rbt-view.component.html',
  styleUrls: ['./note-rbt-view.component.scss']
})
export class NoteRbtViewComponent {
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

  client_id:any;
  doctor_id:any;
  doctor_selected:any;
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
  doctor_selected_full_name:any =null;
  doctor_selected_rbt:any =null;
  doctor_selected_full_name_rbt:any =null;
  doctor_selected_bcba:any =null;
  doctor_selected_full_name_bcba:any =null;

constructor(
  public noteRbtService : NoteRbtService,
  public activatedRoute: ActivatedRoute,
  public doctorService: DoctorService,
  public insuranceService: InsuranceService,
  public bipService:BipService,
  public location:Location,
  )
{
}
ngOnInit(): void {
  window.scrollTo(0, 0);
  this.doctorService.closeMenuSidebar();
  this.doctorService.getUserRoles();
  
  this.activatedRoute.params.subscribe((resp:any)=>{
    // console.log(resp);
    this.note_id = resp.id;
  });
  this.getConfig();
  this.getNote();
}

goBack() {
  this.location.back(); // <-- go back to previous location on cancel
}

getConfig(){
  this.noteRbtService.listConfigNote().subscribe((resp:any)=>{
    console.log(resp);
    
  })
}

getNote(){
  this.noteRbtService.getNote(this.note_id).subscribe((resp:any)=>{
    console.log(resp);
    this.note_selected = resp.noteRbt;
    this.note_selectedId = resp.noteRbt.id;
    this.patient_id = this.note_selected.patient_id;
    this.bip_id = this.note_selected.bip_id;

    this.provider_credential = this.note_selected.provider_credential;
    this.as_evidenced_by = this.note_selected.as_evidenced_by;
    this.client_appeared = this.note_selected.client_appeared;
    this.client_response_to_treatment_this_session = this.note_selected.client_response_to_treatment_this_session;
    
    this.interventions = resp.interventions;
    let jsonObj = JSON.parse(this.interventions) || '';
    this.interventionsgroup = jsonObj;
    // console.log(this.interventionsgroup);

    this.pairing = this.interventionsgroup[0].pairing;
    this.response_block = this.interventionsgroup[0].response_block;
    this.DRA = this.interventionsgroup[0].DRA;
    this.DRO = this.interventionsgroup[0].DRO;
    this.redirection = this.interventionsgroup[0].redirection;
    this.errorless_teaching = this.interventionsgroup[0].errorless_teaching;
    this.NCR = this.interventionsgroup[0].NCR;
    this.shaping = this.interventionsgroup[0].shaping;
    this.chaining = this.interventionsgroup[0].chaining;
    this.token_economy = this.interventionsgroup[0].token_economy;
    this.extinction = this.interventionsgroup[0].extinction;
    this.natural_teaching = this.interventionsgroup[0].natural_teaching;

    
    this.maladaptive = resp.maladaptives;
    let jsonObj1 = JSON.parse(this.maladaptive) || '';
    this.maladaptivegroup = jsonObj1;
    // console.log(this.maladaptivegroup);

    this.replacement = resp.replacements;// ?
    let jsonObj2 = JSON.parse(this.replacement) || '';
    this.replacementgroup = jsonObj2;
    // console.log(this.replacementgroup);

    this.pos = this.note_selected.pos;
    this.environmental_changes = this.note_selected.environmental_changes;
    this.meet_with_client_at = this.note_selected.meet_with_client_at;
    this.progress_noted_this_session_compared_to_previous_session = this.note_selected.progress_noted_this_session_compared_to_previous_session;
    
    this.rbt_modeled_and_demonstrated_to_caregiver = this.note_selected.rbt_modeled_and_demonstrated_to_caregiver;
    this.replacement = this.note_selected.replacement;
    
    // this.session_date = this.note_selected.session_date;
    this.session_date = this.note_selected.session_date? new Date(this.note_selected.session_date).toISOString(): '';
    // this.next_session_is_scheduled_for = this.note_selected.next_session_is_scheduled_for;
    this.next_session_is_scheduled_for = this.note_selected.next_session_is_scheduled_for? new Date(this.note_selected.next_session_is_scheduled_for).toISOString(): '';
    
    this.session_length_total = this.note_selected.session_length_total;
    this.session_length_total2 = this.note_selected.session_length_total2;
    
    this.selectedValueTimeIn = this.note_selected.time_in;
    this.selectedValueTimeOut = this.note_selected.time_in2;
    this.selectedValueTimeIn2 = this.note_selected.time_out;
    this.selectedValueTimeOut2 = this.note_selected.time_out2;

    this.selectedValueProviderName = this.note_selected.provider_name_g;
    this.provider_name = this.note_selected.provider_name;
    
    this.selectedValueRBT = this.note_selected.provider_name;
    this.selectedValueBCBA = this.note_selected.supervisor_name;

    this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED = this.note_selected.provider_signature;
    this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED = this.note_selected.supervisor_signature;
    console.log(this.IMAGE_PREVISUALIZA_SIGNATURE__RBT_CREATED);
    console.log(this.IMAGE_PREVISUALIZA_SIGNATURE_BCBA_CREATED);

    this.getProfileBip();
    this.getDoctor();
    this.getDoctorBcba();
    this.getDoctorRbt();
  })
}

getDoctor(){
  this.doctorService.showDoctor(this.selectedValueProviderName).subscribe((resp:any)=>{
    console.log(resp);
    this.doctor_selected = resp.user;
    this.doctor_selected_full_name = resp.user.full_name;
  });
}

getDoctorRbt(){
  this.doctorService.showDoctor(this.selectedValueRBT).subscribe((resp:any)=>{
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
      pdf.save('note_rbt_client_'+this.patient_selected.patient_id+".pdf");
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
