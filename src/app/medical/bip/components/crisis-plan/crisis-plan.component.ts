import { Component } from '@angular/core';
import { CrisisPlanService } from '../../service/crisis-plan.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { BipService } from '../../service/bip.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crisis-plan',
  templateUrl: './crisis-plan.component.html',
  styleUrls: ['./crisis-plan.component.scss']
})
export class CrisisPlanComponent {

  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';

  public client_id: any;
  public user: any;
  public doctor_id: any;
  public client_selected: any;
  public patient_id: any;
  public bip_selected: any;
  public bip_selectedId: any;
  public bip_selectedIdd: any;
  public maladaptives: any;
  
  public risk_added:any=[];
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

  public crisisPlans:any = [];
  public caregiver_requirements_for_prevention_of_crisis:any = [];
  public crisisplanId:any;
  public crisis_description:any;
  public crisis_note:any;
  public client_id_crisisPlans:any;
  public crisisid:any;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public crisisPlanService:CrisisPlanService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    
    // window.scrollTo(0, 0);//inicia la vista siempre desde arriba
    
    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.patient_id;// la respuesta se comienza a relacionar  en este momento con un cliente especifico
      this.getProfileBip(); // se solicita la info del perfil del usuario
      // this.getGoalbyPatient(); // se solicita la info del perfil del usuario
    })
    
    
    this.ativatedRoute.params.subscribe( ({id}) => this.getBip()); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del goal
    let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: '');//  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
    
  }

  //obtenemos el perfil  del paciente por el id de la ruta
  getProfileBip(){
    this.bipService.showBipProfile(this.patient_id).subscribe((resp:any)=>{
      // console.log('profilebip', resp);
      this.client_selected = resp;//convertimos la respuesta en un variable

      this.client_id = this.client_selected.patient.id;
      if (this.patient_id != null) {
        this.getPatientGoalFamilyEnvolments(this.patient_id);
      }
    });

  }

  //obtenemos el bip por el id 
  getBip(){
    if (this.patient_id !== null && this.patient_id !== undefined) {
      this.bipService.getBipByUser(this.patient_id).subscribe((resp:any)=>{
        // console.log('bip',resp);
  
        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selectedId = resp.id; //convertimos la respuesta en un variable
        this.bip_selectedIdd = this.bip_selected.bip.id; //convertimos la respuesta en un variable
        this.maladaptives =this.bip_selected.maladaptives; //convertimos la respuesta en un variable 
  
      })
    }
    
    
  }

  //obtenemos los tipo goals: sustituions del paciente por el patient_id si existe, 
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoalFamilyEnvolments(patient_id){
    this.crisisPlanService.getCrisisPlanbyPatientId(patient_id).subscribe((resp:any)=>{
      // console.log('goals sustition by patientid',resp);
      this.crisisPlans = resp.crisiPlanPatientIds.data;
      this.crisisplanId = resp.crisiPlanPatientIds.data[0].id;
      //risk list
      this.risk_added = resp.crisiPlanPatientIds.data[0].risk_factors;
      this.other = resp.crisiPlanPatientIds.data[0].risk_factors[0].other;
      this.do_not_apply = resp.crisiPlanPatientIds.data[0].risk_factors[0].do_not_apply;
      this.elopement = resp.crisiPlanPatientIds.data[0].risk_factors[0].elopement;
      this.assaultive_behavior = resp.crisiPlanPatientIds.data[0].risk_factors[0].assaultive_behavior;
      this.aggression = resp.crisiPlanPatientIds.data[0].risk_factors[0].aggression;
      this.self_injurious_behavior = resp.crisiPlanPatientIds.data[0].risk_factors[0].self_injurious_behavior;
      this.sexually_offending_behavior = resp.crisiPlanPatientIds.data[0].risk_factors[0].sexually_offending_behavior;
      this.fire_setting = resp.crisiPlanPatientIds.data[0].risk_factors[0].fire_setting;
      this.current_substance_abuse = resp.crisiPlanPatientIds.data[0].risk_factors[0].current_substance_abuse;
      this.impulsive_behavior = resp.crisiPlanPatientIds.data[0].risk_factors[0].impulsive_behavior;
      this.psychotic_symptoms = resp.crisiPlanPatientIds.data[0].risk_factors[0].psychotic_symptoms;
      this.self_mutilation_cutting = resp.crisiPlanPatientIds.data[0].risk_factors[0].self_mutilation_cutting;
      this.caring_for_ill_family_recipient = resp.crisiPlanPatientIds.data[0].risk_factors[0].caring_for_ill_family_recipient;
      this.current_family_violence = resp.crisiPlanPatientIds.data[0].risk_factors[0].current_family_violence;
      this.dealing_with_significant = resp.crisiPlanPatientIds.data[0].risk_factors[0].dealing_with_significant;
      this.prior_psychiatric_inpatient_admission = resp.crisiPlanPatientIds.data[0].risk_factors[0].prior_psychiatric_inpatient_admission;
      
      
      this.suicidality_added = resp.crisiPlanPatientIds.data[0].suicidalities;
      this.not_present = resp.crisiPlanPatientIds.data[0].suicidalities[0].not_present;
      this.ideation = resp.crisiPlanPatientIds.data[0].suicidalities[0].ideation;
      this.plan = resp.crisiPlanPatientIds.data[0].suicidalities[0].plan;
      this.means = resp.crisiPlanPatientIds.data[0].suicidalities[0].means;
      this.prior_attempt = resp.crisiPlanPatientIds.data[0].suicidalities[0].prior_attempt;
      
      
      this.homicidality_added = resp.crisiPlanPatientIds.data[0].homicidalities;
      this.not_present_homicidality = resp.crisiPlanPatientIds.data[0].homicidalities[0].not_present_homicidality;
      this.ideation_homicidality = resp.crisiPlanPatientIds.data[0].homicidalities[0].ideation_homicidality;
      this.plan_homicidality = resp.crisiPlanPatientIds.data[0].homicidalities[0].plan_homicidality;
      this.means_homicidality = resp.crisiPlanPatientIds.data[0].homicidalities[0].means_homicidality;
      this.prior_attempt_homicidality = resp.crisiPlanPatientIds.data[0].homicidalities[0].prior_attempt_homicidality;

      this.crisis_description = resp.crisiPlanPatientIds.data[0].crisis_description;
      this.caregiver_requirements_for_prevention_of_crisis = resp.crisiPlanPatientIds.data[0].caregiver_requirements_for_prevention_of_crisis;
      this.crisis_note = resp.crisiPlanPatientIds.data[0].crisis_note;
      this.client_id_crisisPlans = resp.crisiPlanPatientIds.data[0].client_id;
      // this.goals = resp.goalReductionPatientIds;
      // console.log(this.goals);
      
      
    })
  }

  addRisk(){

    this.risk_added.push({
      do_not_apply: this.do_not_apply,
      elopement: this.elopement,
      assaultive_behavior: this.assaultive_behavior,
      aggression: this.aggression,
      self_injurious_behavior: this.self_injurious_behavior,
      sexually_offending_behavior: this.sexually_offending_behavior,
      fire_setting: this.fire_setting,
      current_substance_abuse: this.current_substance_abuse,
      impulsive_behavior: this.impulsive_behavior,
      psychotic_symptoms: this.psychotic_symptoms,
      self_mutilation_cutting: this.self_mutilation_cutting,
      caring_for_ill_family_recipient: this.caring_for_ill_family_recipient,
      current_family_violence: this.current_family_violence,
      dealing_with_significant: this.dealing_with_significant,
      prior_psychiatric_inpatient_admission: this.prior_psychiatric_inpatient_admission,
      other: this.other,
    })
     //si existe un elemento actualiza ese elemento en la lista
    if(this.risk_added.length > 1){
      this.risk_added.splice(this.risk_added,1);
    }

  }

  deleteRisk(i:any){
    this.risk_added.splice(i,1);
  }


addSuicidality(){
  this.suicidality_added.push({
    not_present: this.not_present,
    ideation: this.ideation,
    plan: this.plan,
    means: this.means,
    prior_attempt: this.prior_attempt,
  })
   //si existe un elemento actualiza ese elemento en la lista
  if(this.suicidality_added.length > 1){
    this.suicidality_added.splice(this.suicidality_added,1);
  }
}

deleteSuicidality(i:any){
  this.suicidality_added.splice(i,1);
}
addHomicidality(){
  this.homicidality_added.push({
    not_present_homicidality: this.not_present_homicidality,
    ideation_homicidality: this.ideation_homicidality,
    plan_homicidality: this.plan_homicidality,
    means_homicidality: this.means_homicidality,
    prior_attempt_homicidality: this.prior_attempt_homicidality,
  })
   //si existe un elemento actualiza ese elemento en la lista
  if(this.homicidality_added.length > 1){
    this.homicidality_added.splice(this.homicidality_added,1);
  }
}

deleteHomicidality(i:any){
  this.homicidality_added.splice(i,1);
}

  
save(){
  this.text_validation = '';
  if(!this.crisis_description || !this.crisis_note || !this.caregiver_requirements_for_prevention_of_crisis){
    this.text_validation = 'All Fields (*) are required';
    return;
  }

  let data ={
    id:this.crisisplanId,
    bip_id: this.bip_selectedIdd,
    patient_id: this.patient_id,
    client_id: this.client_id,
    crisis_description: this.crisis_description,
    crisis_note: this.crisis_note,
    caregiver_requirements_for_prevention_of_crisis: this.caregiver_requirements_for_prevention_of_crisis,
    risk_factors: this.risk_added,
    suicidalities: this.suicidality_added,
    homicidalities: this.homicidality_added,
  }

  if(this.client_id_crisisPlans && this.crisisplanId){

    this.crisisPlanService.editCrisisPlan(data, this.crisisplanId).subscribe((resp:any)=>{
      // console.log(resp);
      // this.text_success = 'Goal Updated'
      Swal.fire('Updated', `Crisis Plan Updated successfully!`, 'success');
      this.ngOnInit();
    })
    
  }else{
    
    this.crisisPlanService.createCrisisPlan(data).subscribe((resp:any)=>{
      // console.log(resp);
      this.crisisid = resp.id;
      // this.text_success = 'Goal created successfully!'
      Swal.fire('Created', `Crisis Plan Created successfully!`, 'success');
      this.ngOnInit();
    })
  }
}

}
