import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { BipService } from '../../bip/service/bip.service';
import { GoalService } from '../../bip/service/goal.service';
import { PatientMService } from '../../patient-m/service/patient-m.service';

@Component({
  selector: 'app-note-rbt',
  templateUrl: './note-rbt.component.html',
  styleUrls: ['./note-rbt.component.scss']
})
export class NoteRbtComponent {
  public routes = routes;
  client_id:any;
  patient_id:any;
  doctor_id:any;
  patient_selected:any;
  client_selected:any;
  bip_id:any;
  user:any;
  
  public first_name:string = '';
  public last_name:string = '';
  public diagnosis:string = '';
  
  public provider_name_g:string = '';
  public provider_credential:string = '';
  public pos:string = '';
  public session_date:string = '';
  public time_in:string = '';
  public time_out:string = '';
  public time_in2:string = '';
  public time_out2:string = '';
  public session_length_total:string = '';
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
  public pairing:string = '';



  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalService:GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    
    window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.client_id = resp.id;
      this.patient_id= resp.id
      // console.log(this.client_id);
     })
     this.getProfileBip();

    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;
  }

  getProfileBip(){
    this.bipService.showBipProfile(this.client_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp;

      this.first_name = this.client_selected.patient.first_name;
      this.last_name = this.client_selected.patient.last_name;
      this.patient_id = this.client_selected.patient.patient_id;  
      this.diagnosis = this.client_selected.patient.diagnosis_code;  

    });
  }

  //funcion para la primera imagen.. funciona
  loadFile($event:any){
    // if($event.target.files[0].type.indexOf("image")){
    //   this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
    //   return;
    // }
    // this.text_validation = '';
    // this.FILE_SIGNATURE_ANAYST = $event.target.files[0];
    // let reader = new FileReader();
    // reader.readAsDataURL(this.FILE_SIGNATURE_ANAYST);
    // reader.onloadend = ()=> this.IMAGE_PREVISUALIZA_SIGNATURE_ANAYST = reader.result;
    // if($event.target.files[0].type.indexOf("image")){
    //   this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
    //   return;
    // }
    // this.text_validation = '';
    // this.FILE_SIGNATURE_ANAYST = $event.target.files[0];
    // let reader = new FileReader();
    // reader.readAsDataURL(this.FILE_SIGNATURE_ANAYST);
    // reader.onloadend = ()=> this.IMAGE_PREVISUALIZA_SIGNATURE_ANAYST = reader.result;
    
  }

  save(){
    this.router.navigate(['/note/listbyclient/',this.patient_id]);
  }
}
