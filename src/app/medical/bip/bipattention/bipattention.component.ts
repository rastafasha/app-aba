import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { BipService } from '../service/bip.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';
import { GoalService } from '../service/goal.service';
import { Location } from '@angular/common';

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
  option_selected:number = 1;

  
  first_name:string = '';
  last_name:string = '';
  phone:string = '';
  parent_guardian_name:string = '';
  relationship:string = '';
  address:string = '';
  age:number = 0;
  birth_date:string = '';

  
  client_id:any;
  patient_id:any;
  doctor_id:any;
  user:any;

  type_of_assessment:any;
  background_information:any;
  client_selected:any;

  
  
  patient_selected:any;
  bip_id:any;
  
  
  public current_status:any;
  public status:any;
  public goal:any;
  public date:any;
  public decription_goal:any;
  public goals:any = [];
  
  public bip_selected:any;
  public bip_selectedid:any;
  public previus_treatment_and_result:any;
  public current_treatment_and_progress:any;
  public education_status:any;
  public phisical_and_medical_status:any;
  public assestment_conducted:any;
  public documents:any = [];
  public maladaptives:any = [];
  public maladaptive_behavior:any = [];
  public assesstments:any = [];
  public assesstmentsDocuments:any = [];
  public prevalent_setting_event_and_atecedents:any = [];
  public interventions:any = [];


  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalService:GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute,
    public location: Location
  ){

  }

  ngOnInit(): void {
    
    window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.patient_id;
      // this.patient_id= resp.id
      console.log(this.patient_id);
     })
     this.getProfileBip();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;

    
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  optionSelected(value:number){
    this.option_selected = value;
  }

  getProfileBip(){
    this.bipService.showBipProfile(this.patient_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.client_selected = resp;

      this.first_name = this.client_selected.patient.first_name;
      this.last_name = this.client_selected.patient.last_name;
      this.patient_id = this.client_selected.patient.patient_id;  
      this.phone = this.client_selected.patient.phone; 
      this.parent_guardian_name = this.client_selected.patient.parent_guardian_name;
      this.relationship = this.client_selected.patient.relationship;
      this.address = this.client_selected.patient.address;
      this.age = this.client_selected.patient.age;
      
      this.birth_date = this.client_selected.patient.birth_date ? new Date(this.client_selected.patient.birth_date).toISOString(): ''; 
      
    });
  }


}
