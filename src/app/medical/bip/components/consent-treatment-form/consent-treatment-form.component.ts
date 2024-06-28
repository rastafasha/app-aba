import { Component } from '@angular/core';
import { ConsentToTreatmentService } from '../../service/consent-to-treatment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { BipService } from '../../service/bip.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-consent-treatment-form',
  templateUrl: './consent-treatment-form.component.html',
  styleUrls: ['./consent-treatment-form.component.scss']
})
export class ConsentTreatmentFormComponent {

  valid_form:boolean = false;
  valid_form_success:boolean = false;

  public text_success:string = '';
  public text_validation:string = '';

  public client_id: any;
  public user: any;
  public doctor_id: any;
  public client_selected: any;
  public patient_id: any;
  public bip_selected: any;
  public bip_selectedId: any;
  public bip_selectedIdd: any;

  public analyst_signature_date:string = '';
  public parent_guardian_signature_date:string = '';

  public FILE_SIGNATURE_ANAYST:any;
  public IMAGE_PREVISUALIZA_SIGNATURE_ANAYST:any = 'assets/img/user-06.jpg';
  public IMAGE_PREVISUALIZA_SIGNATURE_ANAYST_CREATED:any = 'assets/img/user-06.jpg';
  public FILE_SIGNATURE_PARENT:any;
  public IMAGE_PREVISUALIZA_SIGNATURE_PARENT:any = 'assets/img/user-06.jpg';
  public IMAGE_PREVISUALIZA_SIGNATURE_PARENT_CREATED:any = 'assets/img/user-06.jpg';

  public consentToTreatments:any;
  public client_id_consentToTreatment:any;
  public consentToTreatmentid:any;
  public analyst_signature:any;
  public parent_guardian_signature:any;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public consentToTreatmentService:ConsentToTreatmentService,
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
        this.getPatientConsentToTreatment(this.patient_id);
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
  
      })
    }
    
    
  }

  //obtenemos los tipo goals: sustituions del paciente por el patient_id si existe, 
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientConsentToTreatment(patient_id){
    this.consentToTreatmentService.getConsentToTreatmentbyPatientId(patient_id).subscribe((resp:any)=>{
      // console.log('goals sustition by patientid',resp);
      this.consentToTreatments = resp.consentToTreatmentPatientIds.data[0];
      this.consentToTreatmentid = resp.consentToTreatmentPatientIds.data[0].id;
      // console.log(this.consentToTreatments);
      
      this.client_id_consentToTreatment = resp.consentToTreatmentPatientIds.data[0].client_id;

      // this.parent_guardian_signature_date = this.consentToTreatments.parent_guardian_signature_date ? new Date(this.consentToTreatments.parent_guardian_signature_date).toISOString(): ''; 
      this.parent_guardian_signature_date = this.consentToTreatments.parent_guardian_signature_date; 
      // console.log(this.parent_guardian_signature_date);
      
      this.IMAGE_PREVISUALIZA_SIGNATURE_ANAYST_CREATED = this.consentToTreatments.analyst_signature;
      
      // this.analyst_signature_date = this.consentToTreatments.analyst_signature_date ? new Date(this.consentToTreatments.analyst_signature_date).toISOString(): ''; 
      this.analyst_signature_date = this.consentToTreatments.analyst_signature_date ; 
      // console.log(this.analyst_signature_date);
      
      this.IMAGE_PREVISUALIZA_SIGNATURE_PARENT_CREATED = this.consentToTreatments.parent_guardian_signature;

      
    })
  }

  
  //funcion para la primera imagen.. funciona
  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_ANAYST = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_SIGNATURE_ANAYST);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA_SIGNATURE_ANAYST = reader.result;
    
  }

  //funcion para la segunda  imagen.. no funciona
  loadFile1($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_SIGNATURE_PARENT = $event.target.files[0];
    // console.log(this.FILE_SIGNATURE_PARENT);
    let reader2 = new FileReader();
    reader2.readAsDataURL(this.FILE_SIGNATURE_PARENT);
    reader2.onloadend = ()=> this.IMAGE_PREVISUALIZA_SIGNATURE_PARENT = reader2.result;
  }


  

  save(){debugger
    this.text_validation = '';
    // if(!this.first_name ||!this.last_name || !this.patient_id ){
    //   this.text_validation = 'Los campos con * son obligatorios';
    //   return;
    // }
    // this.valid_form = false;
    let formData = new FormData();

    formData.append('parent_guardian_signature_date', this.parent_guardian_signature_date);
    formData.append('analyst_signature_date', this.analyst_signature_date);
    formData.append('patient_id', this.patient_id);
    formData.append('client_id', this.client_id);

    if(this.bip_selectedIdd){
      formData.append('bip_id', this.bip_selectedIdd);
    }

    // condiciones para revisar si viene o no la foto
    formData.append('imagen', this.FILE_SIGNATURE_ANAYST);
    if(this.analyst_signature){
    }

    // condiciones para revisar si viene o no la foto... no funciona
    formData.append('imagenn', this.FILE_SIGNATURE_PARENT);
    if(this.parent_guardian_signature){
    }

    this.valid_form_success = false;
    this.text_validation = '';

    if(this.client_id_consentToTreatment && this.consentToTreatmentid){

      this.consentToTreatmentService.createConsentToTreatment(formData).subscribe((resp:any)=>{
        // console.log(resp);
        if(resp.message == 403){
          this.text_validation = resp.message_text;
        }else{
          
          Swal.fire('Updated', `Consent To Treatment Updated successfully!`, 'success');
          this.ngOnInit();
        }
      })
      
    }else{
      
      this.consentToTreatmentService.createConsentToTreatment(formData).subscribe((resp:any)=>{
        // console.log(resp);
        if(resp.message == 403){
          this.text_validation = resp.message_text;
        }else{
          // this.valid_form_success = true;
          Swal.fire('Created', `Consent To Treatment Created successfully!`, 'success');
          this.ngOnInit();
        }
      })
    }
    
    


  }

}
