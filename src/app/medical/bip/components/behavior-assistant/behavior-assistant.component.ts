import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import Swal from 'sweetalert2';
import { BipService } from '../../service/bip.service';
import { BehaviorAsistantService } from '../../service/behavior-asistant.service';

@Component({
  selector: 'app-behavior-assistant',
  templateUrl: './behavior-assistant.component.html',
  styleUrls: ['./behavior-assistant.component.scss']
})
export class BehaviorAssistantComponent {

  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';


  public monday:any;
  public tuesday: any;
  public wednesday: any;
  public thursday: any;
  public friday: any;
  public saturday: any;

  public behaviors: any = [];
  
  public client_id: any;
  public user: any;
  public doctor_id: any;
  public client_selected: any;
  public patient_id: any;
  public bip_selected: any;
  public bip_selectedId: any;
  public bip_selectedIdd: any;
  public maladaptives: any;


  public goalFamilyEnvolments: any;
  public client_id_goalFamilyEnvolments: any;
  public goalFamilyEnvolmentid: any;
  public goalFamilyid: any;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public behaviorAsistantService:BehaviorAsistantService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    
    // window.scrollTo(0, 0);//inicia la vista siempre desde arriba
    
    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.client_id = resp.id;// la respuesta se comienza a relacionar  en este momento con un cliente especifico
      
    })
   let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: '');//  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
    
  }



  addDocument(){
    this.behaviors.push({
      monday: this.monday,
      tuesday: this.tuesday,
      wednesday: this.wednesday,
      thursday: this.thursday,
      friday: this.friday,
      saturday: this.saturday,
    })
    this.monday = '';
    this.tuesday = '';
    this.wednesday = '';
    this.thursday = '';
    this.friday = '';
    this.saturday = '';
  }

  deleteDocument(i:any){
    this.behaviors.splice(i,1);
  }

}
