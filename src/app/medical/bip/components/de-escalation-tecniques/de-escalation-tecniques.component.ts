import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { GoalFamilyEnvolmentService } from '../../service/goal-family-envolment.service';
import { DeEscalationTechniqueService } from '../../service/de-escalation-technique.service';

@Component({
  selector: 'app-de-escalation-tecniques',
  templateUrl: './de-escalation-tecniques.component.html',
  styleUrls: ['./de-escalation-tecniques.component.scss']
})
export class DeEscalationTecniquesComponent {
  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';

  public description: any;
  public service_recomendation: any;

  public cpt: any;
  public description_service: any;
  public num_units: any;
  public breakdown_per_week: any;
  public location: any;

  public caregivers_training_goals: any = [];
  public deEscalationopts: any = [];
  
  public client_id: any;
  public user: any;
  public doctor_id: any;
  public client_selected: any;
  public patient_id: any;
  public bip_selected: any;
  public bip_selectedId: any;
  public bip_selectedIdd: any;
  public maladaptives: any;
  
  public location_edit: any;

  public deEscalalationsTechs: any;
  public client_id_deEscalalationsTechs: any;
  public deEscalalationsTechid: any;
  public goalFamilyid: any;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public deEscalationTechniqueService:DeEscalationTechniqueService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){

  }

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
    this.deEscalationTechniqueService.getDeEscalationTechniquebyPatientId(patient_id).subscribe((resp:any)=>{
      // console.log('goals sustition by patientid',resp);
      this.deEscalalationsTechs = resp.deEscalationTechniquePatientIds.data;
      this.deEscalalationsTechid = resp.deEscalationTechniquePatientIds.data[0].id;
      this.description = resp.deEscalationTechniquePatientIds.data[0].description;
      this.deEscalationopts = resp.deEscalationTechniquePatientIds.data[0].recomendation_lists;
      this.service_recomendation = resp.deEscalationTechniquePatientIds.data[0].service_recomendation;
      this.client_id_deEscalalationsTechs = resp.deEscalationTechniquePatientIds.data[0].client_id;
      // this.goals = resp.goalReductionPatientIds;
      // console.log(this.goals);
      
      
    })
  }


  addDocument(){
    this.deEscalationopts.push({
      cpt: this.cpt,
      description_service: this.description_service,
      num_units: this.num_units,
      breakdown_per_week: this.breakdown_per_week,
      location: this.location,
    })
    this.cpt = '';
    this.description_service = '';
    this.num_units = '';
    this.breakdown_per_week = '';
    this.location = '';
  }

  deleteDocument(i:any){
    this.deEscalationopts.splice(i,1);
  }

  save(){
    this.text_validation = '';
    if(!this.deEscalationopts){
      this.text_validation = 'All Fields (*) are required';
      return;
    }

    let data ={
      id:this.deEscalalationsTechid,
      bip_id: this.bip_selectedIdd,
      patient_id: this.patient_id,
      client_id: this.client_id,
      description: this.description,
      service_recomendation: this.service_recomendation,
      recomendation_lists: this.deEscalationopts,
    }

    if(this.client_id_deEscalalationsTechs && this.deEscalalationsTechid){

      this.deEscalationTechniqueService.editDeEscalationTechnique(data, this.deEscalalationsTechid).subscribe((resp:any)=>{
        // console.log(resp);
        // this.text_success = 'Goal Updated'
        Swal.fire('Updated', `De Escalation Technique Updated successfully!`, 'success');
        this.ngOnInit();
      })
      
    }else{
      
      this.deEscalationTechniqueService.createDeEscalationTechnique(data).subscribe((resp:any)=>{
        // console.log(resp);
        this.goalFamilyid = resp.id;
        // this.text_success = 'Goal created successfully!'
        Swal.fire('Created', `De Escalation Technique Created successfully!`, 'success');
        this.ngOnInit();
      })
    }

   

  }


  cambiarStatus(escalation:any){
    this.location_edit = escalation;
    // console.log(this.location_edit.location);

    let data ={
      recomendation_lists: this.deEscalationopts,
    }
    
    this.deEscalationTechniqueService.editDeEscalationTechnique(data, this.deEscalalationsTechid).subscribe(
      resp =>{
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      }
    )
  }
}
