import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { BipService } from '../service/bip.service';
import { environment } from 'src/environments/environment';
import { RolesService } from '../../roles/service/roles.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bip-profile',
  templateUrl: './bip-profile.component.html',
  styleUrls: ['./bip-profile.component.scss']
})
export class BipProfileComponent {
  public routes = routes;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  public patientProfile: any[];
  option_selected:number = 1;
  public patient_id: any;

  public num_appointment: number = 0;
  public money_of_appointments: number = 0;
  public num_appointment_pendings: number = 0;
  public appointment_pendings: any =[];
  public appointments: any =[];
  public pa_assessments: any =[];

  public type_of_assessment: any =[];
  public background_information: any =[];
  public previus_treatment_and_result: any =[];
  public current_treatment_and_progress: any =[];
  public education_status: any =[];
  public phisical_and_medical_status: any =[];
  public assestment_conducted: any =[];
  public documents: any =[];
  public maladaptives: any =[];
  public maladaptive_behavior: any =[];
  public assesstments: any =[];
  public assesstmentsDocuments: any =[];
  public prevalent_setting_event_and_atecedents: any =[];
  public interventions: any;
  
  public bip_selected: any ={};
  public patient_selected: any ={};
  public reduction_goals: any =[];
  public reduction_goals_goalltos: any =[];
  public reduction_goals_goalstos: any =[];
  public sustitution_goal: any =[];
  public sustitution_goal_ltos: any =[];
  public sustitution_goal_stos: any =[];
  public family_envolment: any =[];
  public monitoring_evalutating: any =[];
  public monitoring_evalutating_goals: any =[];
  public generalization_training: any =[];
  public transition_fading_plans: any =[];
  public de_escalation_techniques: any =[];
  public analyst_signature:any = '';
  public analyst_signature_date:string = '';
  public parent_guardian_signature:any = '';
  public parent_guardian_signature_date:string = '';
  
  public caregiver_requirements_for_prevention_of_crisis:string = '';
  public crisis_description:string = '';
  public crisis_note:string = '';

  public text_success:string = '';
  public text_validation:string = '';


  public crisis_plan:any=[];
  public risk_added:any=[];
  public risk_factors:any=[];
  public do_not_apply:any;
  public elopement:any;
  public assaultive_behavior:any;
  public aggression:any;
  public self_injurious_behavior:any;
  public sexually_offending_behavior:any;
  public fire_setting:any;
  public current_substance_abuse:any;
  public impulsive_behavior:any;
  public psychotic_symptoms:any;
  public self_mutilation_cutting:any;
  public caring_for_ill_family_recipient:any;
  public current_family_violence:any;
  public dealing_with_significant:any;
  public prior_psychiatric_inpatient_admission:any;
  public other:any;

  public suicidality_added:any=[];
  public not_present:any;
  public ideation:any;
  public plan:any;
  public means:any;
  public prior_attempt:any;

  public homicidality_added:any=[];
  public not_present_homicidality:any;
  public ideation_homicidality:any;
  public plan_homicidality:any;
  public means_homicidality:any;
  public prior_attempt_homicidality:any;
  public user:any;
  public patientId:any;
  public roles:any=[];
  public permissions:any=[];
  

  imagenSerUrl = environment.url_media;

  constructor(
    public bipService : BipService,
    public activatedRoute: ActivatedRoute,
    public doctorService: DoctorService,
    public roleService: RolesService,
    public location: Location,
    )
  {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.doctorService.closeMenuSidebar();
    // this.doctorService.getUserRoles();
    this.activatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.patient_id;
      console.log(this.patient_id);
      this.getPatient();
    });
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

  getPatient(){
    this.bipService.getBipProfilePatientPdf_id(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.bip_selected= resp.bip;
      this.patient_selected= resp.patient;
      this.patientId= resp.patient.patient_id;


      this.type_of_assessment =this.bip_selected.type_of_assessment;

      this.background_information = this.bip_selected.background_information,
      this.previus_treatment_and_result = this.bip_selected.previus_treatment_and_result,
      this.current_treatment_and_progress = this.bip_selected.current_treatment_and_progress,
      this.education_status = this.bip_selected.education_status,
      this.phisical_and_medical_status = this.bip_selected.phisical_and_medical_status,
      this.assestment_conducted = this.bip_selected.assestment_conducted,
      
      this.documents =this.bip_selected.documents_reviewed;
      // console.log(this.documents);
      this.maladaptives =this.bip_selected.maladaptives;
      this.maladaptive_behavior =this.bip_selected.maladaptives[0].title;
      
      // console.log(this.maladaptives);
      // console.log(this.maladaptive_behavior);

      this.assesstments =this.bip_selected.assestment_conducted_options;
      this.assesstmentsDocuments =this.bip_selected.assestment_conducted_options;
      this.prevalent_setting_event_and_atecedents =this.bip_selected.prevalent_setting_event_and_atecedents;
      // this.interventions =this.bip_selected.interventions;

      this.analyst_signature =this.bip_selected.consent_to_treatment[0].analyst_signature;
      this.analyst_signature_date =this.bip_selected.consent_to_treatment[0].analyst_signature_date;
      this.parent_guardian_signature =this.bip_selected.consent_to_treatment[0].parent_guardian_signature;
      this.parent_guardian_signature_date =this.bip_selected.consent_to_treatment[0].parent_guardian_signature_date;
      
      this.reduction_goals =this.bip_selected.reduction_goal;
      this.reduction_goals_goalltos =this.bip_selected.reduction_goal[0].goalltos;
      this.reduction_goals_goalstos =this.bip_selected.reduction_goal[0].goalstos;
      this.sustitution_goal =this.bip_selected.sustitution_goal;
      this.sustitution_goal_ltos =this.bip_selected.sustitution_goal[0].goalltos;
      this.sustitution_goal_stos =this.bip_selected.sustitution_goal[0].goalstos;
      this.family_envolment =this.bip_selected.family_envolment[0].caregivers_training_goals;

      this.monitoring_evalutating =this.bip_selected.monitoring_evalutating;
      this.monitoring_evalutating_goals =this.bip_selected.monitoring_evalutating[0].rbt_training_goals;
      this.generalization_training =this.bip_selected.generalization_training;
      this.transition_fading_plans =this.bip_selected.generalization_training[0].transition_fading_plans;
      this.de_escalation_techniques =this.bip_selected.de_escalation_technique[0].recomendation_lists;
      
      

      this.caregiver_requirements_for_prevention_of_crisis =this.bip_selected.crisis_plan[0].caregiver_requirements_for_prevention_of_crisis;
      this.crisis_description =this.bip_selected.crisis_plan[0].crisis_description;
      this.crisis_note =this.bip_selected.crisis_plan[0].crisis_note;
      this.crisis_plan =this.bip_selected.crisis_plan[0];
      this.risk_factors = this.bip_selected.crisis_plan[0].risk_factors;

      let jsonObj = JSON.parse(this.reduction_goals_goalstos) || '';
      this.reduction_goals_goalstos = jsonObj;
      // console.log(this.reduction_goals_goalstos);
      
      let jsonObj1 = JSON.parse(this.sustitution_goal_stos) || '';
      this.sustitution_goal_stos = jsonObj1;
      // console.log(this.sustitution_goal_stos);
      
      let jsonObj2 = JSON.parse(this.sustitution_goal_ltos) || '';
      this.sustitution_goal_ltos = jsonObj2;
      // console.log(this.sustitution_goal_ltos);

      let jsonObj3 = JSON.parse(this.family_envolment) || '';
      this.family_envolment = jsonObj3;
      // console.log(this.family_envolment);

      let jsonObj4 = JSON.parse(this.monitoring_evalutating_goals) || '';
      this.monitoring_evalutating_goals = jsonObj4;
      // console.log(this.monitoring_evalutating_goals);

      let jsonObj5 = JSON.parse(this.transition_fading_plans) || '';
      this.transition_fading_plans = jsonObj5;
      // console.log(this.transition_fading_plans);
      
      let jsonObj6 = JSON.parse(this.de_escalation_techniques) || '';
      this.de_escalation_techniques = jsonObj6;
      // console.log(this.transition_fading_plans);

    
      

      let jsonObj7 = JSON.parse(this.risk_factors) || '';
      this.risk_factors = jsonObj7;
      // console.log(this.risk_factors);
      
      this.other = this.risk_factors[0].other;
      // console.log(this.other);
      this.do_not_apply = this.risk_factors[0].do_not_apply;
      this.elopement = this.risk_factors[0].elopement;
      this.assaultive_behavior = this.risk_factors[0].assaultive_behavior;
      this.aggression = this.risk_factors[0].aggression;
      this.self_injurious_behavior = this.risk_factors[0].self_injurious_behavior;
      this.sexually_offending_behavior = this.risk_factors[0].sexually_offending_behavior;
      this.fire_setting = this.risk_factors[0].fire_setting;
      this.current_substance_abuse = this.risk_factors[0].current_substance_abuse;
      this.impulsive_behavior = this.risk_factors[0].impulsive_behavior;
      this.psychotic_symptoms = this.risk_factors[0].psychotic_symptoms;
      this.self_mutilation_cutting = this.risk_factors[0].self_mutilation_cutting;
      this.caring_for_ill_family_recipient = this.risk_factors[0].caring_for_ill_family_recipient;
      this.current_family_violence = this.risk_factors[0].current_family_violence;
      this.dealing_with_significant = this.risk_factors[0].dealing_with_significant;
      this.prior_psychiatric_inpatient_admission = this.risk_factors[0].prior_psychiatric_inpatient_admission;
      
      
      this.suicidality_added = resp.bip.crisis_plan[0].suicidalities;
      let jsonObj8 = JSON.parse(this.suicidality_added) || '';
      this.suicidality_added = jsonObj8;
      // console.log(this.suicidality_added);

      this.not_present = this.suicidality_added[0].not_present;
      this.ideation = this.suicidality_added[0].ideation;
      this.plan = this.suicidality_added[0].plan;
      this.means = this.suicidality_added[0].means;
      this.prior_attempt = this.suicidality_added[0].prior_attempt;
      
      
      this.homicidality_added = resp.bip.crisis_plan[0].homicidalities;
      let jsonObj9 = JSON.parse(this.homicidality_added) || '';
      this.homicidality_added = jsonObj9;
      // console.log(this.homicidality_added);

      this.not_present_homicidality = this.homicidality_added[0].not_present_homicidality;
      this.ideation_homicidality = this.homicidality_added[0].ideation_homicidality;
      this.plan_homicidality = this.homicidality_added[0].plan_homicidality;
      this.means_homicidality = this.homicidality_added[0].means_homicidality;
      this.prior_attempt_homicidality = this.homicidality_added[0].prior_attempt_homicidality;


    })
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

  //     const margins = {
  //       top: 40,
  //       bottom: 60,
  //       left: 40,
  //       width: 522
  //     };

  //     // Create a new PDF document
  //     const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
  //     // const pdf = new jspdf.jsPDF('p', 'pt', 'letter');

  //     // Add an image of the canvas to the PDF
  //     pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight);

  //     // Save the PDF
  //     pdf.save('bip_'+this.patient_selected.patient_id+".pdf");
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
    pdf.save('bip_'+this.patient_selected.patient_id+".pdf");
    // pdf.save('note_rbt_client_'+this.patient_selected.patient_id+'_'+this.patient_selected.last_name+".pdf");
  });

    
}
}
