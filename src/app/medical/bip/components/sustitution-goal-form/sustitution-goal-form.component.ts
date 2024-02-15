import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { BipService } from '../../service/bip.service';
import { GoalSustitutionService } from '../../service/goal-sustitution.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sustitution-goal-form',
  templateUrl: './sustitution-goal-form.component.html',
  styleUrls: ['./sustitution-goal-form.component.scss']
})
export class SustitutionGoalFormComponent {

  // created comments by Malcolm Cordova at 10 feb 2004
  // mercadocreativo@gmail.com
  // @malcolmcordova

  public routes = routes;
  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';

  public client_id:any;
  public user:any;
  public doctor_id:any;
  public patient_id:any;
  public client_selected:any;

  public bip_id:any;
  public bip_selected:any;
  public bip_selectedId:any;
  public bip_selectedIdd:any;
  public maladaptives:any = [];
  
  public goalSustitutions:any = [];
  public client_id_goalSustitution:any;

  //goals
  public maladaptiveSelected:any;
  public maladaptiveSelectedSon:any;
  public goalmaladaptive:any ;
  public goalmaladaptive_child:any = [];
  public goalReductionPatientIds:any = [];
  
  public goalmaladaptiveid:any;

  public goalSustitutionId:any;
  public goalsustitid:any;
  public current_sustitution!:any;
  public description!:any;

 
  public golstoSustiutions:any = [];
  public golltoSustiution:any = [];
  public golsto_child:any = [];
  public gollto_child:any = [];

  public client_id_goal:any;
  public goalid:any;
  public goal_id:any;
  public maladaptive:any;

  //grafico
  public maladaptive_child:any;

  //listas
  public sustitution_sto:any;
  public sustitution_decription_sto:any;
  public sustitution_lto:any;
  public sustitution_decription_lto:any;
  
  public sustitution_status_sto:any;
  public sustitution_status_sto_edit:any;
  public sustitution_status_lto:any;
  public sustitution_date_sto:Date ;
  public sustitution_date_lto:Date;

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalSustitutionService:GoalSustitutionService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    
    // window.scrollTo(0, 0);//inicia la vista siempre desde arriba
    
    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.client_id = resp.id;// la respuesta se comienza a relacionar  en este momento con un cliente especifico
      this.getProfileBip(); // se solicita la info del perfil del usuario
      // this.getGoalbyPatient(); // se solicita la info del perfil del usuario
    })
    
    
    this.ativatedRoute.params.subscribe( ({id}) => this.getBip(id)); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del bip
    // this.ativatedRoute.params.subscribe( ({id}) => this.getGoal(id)); // se solicita la info del perfil del goal
    let USER = localStorage.getItem("user");// se solicita el usuario logueado
    this.user = JSON.parse(USER ? USER: '');//  si no hay un usuario en el localstorage retorna un objeto vacio
    this.doctor_id = this.user.id; //se asigna el doctor logueado a este campo para poderlo enviar en los
    
  }


  //obtenemos el perfil  del paciente por el id de la ruta
  getProfileBip(){
    this.bipService.showBipProfile(this.client_id).subscribe((resp:any)=>{
      // console.log('profilebip', resp);
      this.client_selected = resp;//convertimos la respuesta en un variable

      this.patient_id = this.client_selected.patient.patient_id;
      if (this.patient_id != null) {
        this.getPatientGoalSustitutions(this.patient_id);
      }
    });

  }

  //obtenemos el bip por el id 
  getBip(id){
    if (id !== null && id !== undefined) {
      this.bipService.getBipByUser(+id).subscribe((resp:any)=>{
        // console.log('bip',resp);
  
        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selectedId = resp.id; //convertimos la respuesta en un variable
        this.bip_selectedIdd = this.bip_selected.bip.id; //convertimos la respuesta en un variable
        this.maladaptives =this.bip_selected.maladaptives; //convertimos la respuesta en un variable 
  
      })
    }
    
    
  }

  //obtenemos los tipo goals: sustituions del paciente por el patient_id si existe, 
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoalSustitutions(patient_id){
    this.goalSustitutionService.getGoalSustitutionbyPatientId(patient_id).subscribe((resp:any)=>{
      console.log('goals sustition by patientid',resp);
      this.goalSustitutions = resp.sustitutiongoalPatientIds.data[0];
      this.goalSustitutionId = resp.sustitutiongoalPatientIds.data[0].id;
      this.client_id_goalSustitution = resp.sustitutiongoalPatientIds.data[0].client_id;
      // this.goals = resp.goalReductionPatientIds;
      // console.log(this.goals);
      
      
    })
  }


  //selectores 
  //seleccionamos el maladaptive de la lista
  //obtenemos informacion de la seleccion
  selectedMaladaptive(maladap:any){
    this.maladaptiveSelected = maladap
    // console.log(this.maladaptiveSelected);
    //llamamos la funcion del  servicio para obtener la informacion adicional que se va a mostrar en la ventana
    this.getGoalsMaladaptives();
    
  }

  //obtenemos los goals del maladaptive por nombre
  //obtenemos los maladaptives iniciales para poder relacionarlos con los goals
  getGoalsMaladaptives(){
    this.goalSustitutionService.listMaladaptivesGoalSustitutions(this.maladaptiveSelected.maladaptive_behavior).subscribe((resp:any)=>{
      console.log( resp);
      
      this.goalmaladaptive = resp.sustitutiongoalmaladaptive.data;
      this.goalmaladaptiveid = resp.sustitutiongoalmaladaptive.data[0].id;
      // this.goalmaladaptive = resp.goalsmaladaptive || null;
      console.log('palabra maladaptive', this.goalmaladaptive);
      this.current_sustitution = this.goalmaladaptive[0].current_sustitution;
      this.description = this.goalmaladaptive[0].description;

      if (this.goalmaladaptive == undefined) {
        this.current_sustitution = '';
        this.golstoSustiutions = '';
        this.golltoSustiution = '';
      }else{
        
        this.golstoSustiutions = this.goalmaladaptive[0].goalstos;
        console.log(this.golstoSustiutions);
        this.golltoSustiution = this.goalmaladaptive[0].goalltos;
        console.log(this.golltoSustiution);
      }

      this.ngOnInit();
    },);

  }

  //selectores seleccionamos el grafico del maladaptive de la lista
  selectedMaladaptiveSon(maladap:any){
    this.maladaptiveSelectedSon = maladap
    // console.log(this.maladaptiveSelectedSon);
    this.getGoalsSonMaladaptives();
  }
  
  deleteMaladaptiveSon(goalsto:any){debugger
    // this.maladaptiveSelectedSon.splice(i,1);
    this.goalSustitutionService.deleteGoalSustitution(goalsto.id).subscribe((resp:any)=>{
      // alert("Se elimino el objetivo");
      // this.getGoals();
    })
  }

  //fin selectores

  //listas
  addSTOGoal(){
    this.golstoSustiutions.push({
      maladaptive: this.maladaptiveSelected.maladaptive_behavior,
      sustitution_sto: this.sustitution_sto,
      sustitution_status_sto: this.sustitution_status_sto,
      sustitution_status_sto_edit: this.sustitution_status_sto,
      sustitution_date_sto: this.sustitution_date_sto,
      sustitution_decription_sto: this.sustitution_decription_sto,
    })
    this.sustitution_sto = '';
    this.sustitution_status_sto = '';
    this.sustitution_status_sto_edit = '';
    this.sustitution_date_lto = null;
    this.sustitution_decription_sto = '';
  }

  deleteSTOGoal(i:any){
    this.golstoSustiutions.splice(i,1);
  }
  addLTOGoal(){
    this.golltoSustiution.push({
      sustitution_lto: this.sustitution_lto,
      sustitution_status_lto: this.sustitution_status_lto,
      sustitution_date_lto: this.sustitution_date_lto,
      sustitution_decription_lto: this.sustitution_decription_lto,
    })
    this.sustitution_lto = '';
    this.sustitution_status_lto = '';
    this.sustitution_date_lto = null;
    this.sustitution_decription_lto = '';
  }

  deleteLTOGoal(i:any){
    this.golltoSustiution.splice(i,1);
  }

  cambiarStatus(goalsto:any){
    this.sustitution_status_sto_edit = goalsto;
    console.log(this.sustitution_status_sto_edit.status_sto);

    let data ={
      goalstos: this.golstoSustiutions,
      goalltos: this.golltoSustiution,
    }
    
    this.goalSustitutionService.editGoalSustitution(data, this.goalmaladaptiveid).subscribe(
      resp =>{
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      }
    )
  }

  //listas



  back(){
    this.maladaptiveSelected = null;
    this.maladaptiveSelectedSon = null;
    this.current_sustitution = '';
    this.ngOnInit();
  }

  saveGoal(){
    this.text_validation = '';
    // if(!this.maladaptive || !this.current_sustitution || !this.golsto){
    //   this.text_validation = 'Is required this information ';
    //   return;
    // }

    let data ={
      id:this.goalsustitid,
      bip_id: this.bip_selectedIdd,
      maladaptive: this.maladaptiveSelected.maladaptive_behavior,
      patient_id: this.patient_id,
      current_sustitution: this.current_sustitution,
      goalstos: this.golstoSustiutions,
      goalltos: this.golltoSustiution,
      client_id: this.client_id,
      description: this.description,
    }

    if(this.client_id_goalSustitution && this.goalSustitutionId){

      this.goalSustitutionService.editGoalSustitution(data, this.goalSustitutionId).subscribe((resp:any)=>{
        // console.log(resp);
        // this.text_success = 'Goal Updated'
        Swal.fire('Updated', `Goal Sustitution Updated successfully!`, 'success');
        this.ngOnInit();
      })
      
    }else{
      
      this.goalSustitutionService.createGoalSustitution(data).subscribe((resp:any)=>{
        console.log(resp);
        this.goalsustitid = resp.id;
        // this.text_success = 'Goal created successfully!'
        Swal.fire('Created', `Goal Sustitution Created successfully!`, 'success');
        this.ngOnInit();
        // this.getGoalsMaladaptives();
      })
    }

   

  }


  //grafico
  //obtenemos los goals del maladaptive por nombre  para el grafico 
  getGoalsSonMaladaptives(){
    this.goalSustitutionService.listMaladaptivesGoalSustitutions(this.maladaptiveSelectedSon.maladaptive_behavior).subscribe((resp:any)=>{
      console.log( resp);
      
      this.goalmaladaptive_child = resp.goalsmaladaptive.data;

      this.maladaptive_child = resp.goalsmaladaptive.data[0].maladaptive;
      console.log(this.maladaptive_child);

      this.golsto_child = this.goalmaladaptive_child[0].goalstos;
      console.log(this.golsto_child);

      this.gollto_child = this.goalmaladaptive_child[0].goalltos;
      console.log(this.gollto_child);
      // this.ngOnInit();
    },);

  }




}
