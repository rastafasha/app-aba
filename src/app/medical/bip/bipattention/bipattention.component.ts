import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { BipService } from '../service/bip.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';

@Component({
  selector: 'app-bipattention',
  templateUrl: './bipattention.component.html',
  styleUrls: ['./bipattention.component.scss']
})
export class BipattentionComponent {
  public routes = routes;

  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';

  
  first_name:string = '';
  last_name:string = '';
  phone:string = '';
  parent_guardian_name:string = '';
  relationship:string = '';
  address:string = '';
  age:number = 0;
  dob:string = '';

  public medical:any = [];
  description:any;
  name_medical:any;
  uso:any;
  
  client_id:any;
  type_of_assessment:any;
  background_information:any;
  client_selected:any;
  appointment_atention_selected:any;
  previus_treatment_and_result:any;
  current_treatment_and_progress:any;
  education_status:any;
  phisical_and_medical_status:any;
  assestment_conducted:any;
  assestment_conducted_options:any;
  prevalent_setting_event_and_atecedents:any;
  behavior:any;
  hypothesized_functions:any;
  pairing:any;
  premack_principal:any;
  response_block:any;
  dro:any;
  dra:any;
  errorless_teaching:any;
  redirection:any;
  ncr:any;
  shaping:any;
  chaining:any;
  reduction:any = [];
  maladaptive:any = [];

  
  public documents:any = [];
  public doctor_referal: any;
  public medical_notes: any;
  public cde: any;
  public iep: any;
  public mnl: any;
  public referal: any;


  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    
    window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.client_id = resp.id;
      console.log(this.client_id);
     })
     this.getAppointment();
    //  this.getConfig();
  }


  getConfig(){
    // this.bipService.listConfig().subscribe((resp:any)=>{
    //   console.log(resp);
    //   this.documents_name = resp.documents.name;
    //   // this.documents_name = resp.documents_recev;
    // })
  }
  

  getAppointment(){
    this.bipService.showBipProfile(this.client_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp;

      this.first_name = this.client_selected.patient.first_name;
      this.last_name = this.client_selected.patient.last_name;
      this.client_id = this.client_selected.patient.client_id;  
      this.phone = this.client_selected.patient.phone; 
      this.parent_guardian_name = this.client_selected.patient.parent_guardian_name;
      this.relationship = this.client_selected.patient.relationship;
      this.address = this.client_selected.patient.address;
      this.age = this.client_selected.patient.age;
      this.dob = this.client_selected.patient.dob;

    });
    // cita medica

    // this.bipService.showCitamedica(this.client_id).subscribe((resp:any)=>{
    //   // console.log(resp);

    //   this.appointment_atention_selected = resp.appointment_attention;
    //   this.medical =this.appointment_atention_selected.receta_medica;
    //   this.description =this.appointment_atention_selected.description;


    // })

  }

  addService(){
    this.documents.push({
      doctor_referal: this.doctor_referal,
      medical_notes: this.medical_notes,
      cde: this.cde,
      iep: this.iep,
      mnl: this.mnl,
      referal: this.referal,
    })
    // this.doctor_referal = '';
    // this.medical_notes = '';
    // this.cde = '';
    // this.iep = '';
    // this.mnl = '';
    // this.referal = '';
  }

  deleteService(i:any){
    this.documents.splice(i,1);
  }
  

  save(){
    this.text_validation = '';
    if(!this.description || this.medical.length == 0){
      this.text_validation = 'Es requerido ingresar el diagnostico y una receta medica';
      return;
    }

    let data ={
      client_id: this.client_id,
      description: this.description,
      medical: this.medical,
      patient_id: this.client_selected.patient_id,
    }

    this.bipService.createBip(data).subscribe((resp:any)=>{
      // console.log(resp);
      this.text_success = 'Se guardó la informacion de la cita médica'
    })

  }


}
