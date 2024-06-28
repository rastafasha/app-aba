import { Component, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BipService } from 'src/app/medical/bip/service/bip.service';
import { GoalService } from 'src/app/medical/bip/service/goal.service';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { routes } from 'src/app/shared/routes/routes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reduction-goal-form',
  templateUrl: './reduction-goal-form.component.html',
  styleUrls: ['./reduction-goal-form.component.scss']
})
export class ReductionGoalFormComponent {

  // created comments by Malcolm Cordova at 10 feb 2004
  // mercadocreativo@gmail.com
  // @malcolmcordova

  @Output() cursoD: EventEmitter<any>  = new EventEmitter();// envia la data

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
  public goalmaladaptive:any =[];
  public goalmaladaptive_child:any = [];
  public goalReductionPatientIds:any = [];
  
  public goalmaladaptiveid:any;
  public current_status!:any;
  public golsto:any = [{}];
  public gollto:any = [{}];
  public golsto_child:any = [{}];
  public gollto_child:any = [{}];

  public client_id_goal:any;
  public goalid:any;
  public goal_id:any;
  public maladaptive:any;

  //grafico
  public maladaptive_child:any;

  //listas
  public sto:any;
  public decription_sto:any;
  public lto:any;
  public decription_lto:any;
  
  public status_sto:any;
  public status_sto_edit:any;
  public status_lto_edit:any;
  public status_lto:any;
  public date_sto:Date ;
  public date_lto:Date;


  //revisar
  goalpatient_selected:any;
  goal_selected:any;
  goalsbybipid:any;
  goals:any = [];
  goalReductions:any = [];

  goalmaladaptive_clientId:any;
  goalReductionId:any;


  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalService:GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    //me subcribo al id recibido por el parametro de la url
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.patient_id = resp.patient_id;// la respuesta se comienza a relacionar  en este momento con un cliente especifico
      this.getProfileBip(); // se solicita la info del perfil del usuario
      console.log(this.patient_id);
    })
    
    
    this.ativatedRoute.params.subscribe( ({id}) => this.getBip()); // se solicita la info del perfil del bip
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
        this.getPatientGoals(this.patient_id);
      }
    });

  }

  //obtenemos el bip por el id 
  getBip(){
    if (this.patient_id !== null && this.patient_id !== undefined) {
      this.bipService.getBipByUser(this.patient_id).subscribe((resp:any)=>{
        // console.log('bip',resp);
  
        this.bip_selected = resp; //convertimos la respuesta en un variable
        this.bip_selectedId = resp.id; //convertimos la respuesta en un variable
        this.bip_selectedIdd = this.bip_selected.bip.id; //convertimos la respuesta en un variable
        this.maladaptives =this.bip_selected.maladaptives; //convertimos la respuesta en un variable 
  
      })
    }
    
    
  }
  
//obtenemos los tipo goals: reductions del paciente por el patient_id si existe, 
  //si existe enviamos el client_id_goal para actualizar el goal del paciente
  getPatientGoals(patient_id){
    this.goalService.getGoalbyPatientId(patient_id).subscribe((resp:any)=>{
      console.log('goals by patientid',resp);
      this.goalReductions = resp.goalReductionPatientIds.data[0] ==""?[] : resp.goalReductionPatientIds.data;
      this.goalReductionId = resp.goalReductionPatientIds.data[0].id || undefined;
      this.client_id_goal = resp.goalReductionPatientIds.data[0].client_id;
      
      
    })
  }

  //obtenemos el goal del paciente por el id //revisar para que se usa
  getGoalbyPatient(){
    
    this.goalService.getGoalbyPatientId(this.patient_id).subscribe((resp:any)=>{
      
      this.goalpatient_selected = resp;//convertimos la respuesta en un variable
      this.goalid = resp.id; //convertimos la respuesta en un variable

    })
    
    
  }

  


  //obtenemos los goals por el id del bip //revisar
  getGoalsByBip(){
    this.goalService.getGoalbyBipId(this.bip_selectedId).subscribe((resp:any)=>{
      // console.log(resp);
      this.goal_selected = resp.goalreductions;
      // console.log(this.goal_selected);
      this.goalsbybipid = resp.id;
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
    // setTimeout(() => {
    //   // this.router.navigate([routes.adminDashboard]);
    // }, 50);
    
    
  }

  //obtenemos los goals del maladaptive por nombre
  //obtenemos los maladaptives iniciales para poder relacionarlos con los goals
  getGoalsMaladaptives(){
    this.patient_id = this.patient_id;
    this.goalService.listMaladaptivesGoals(this.maladaptiveSelected.maladaptive_behavior, this.patient_id).subscribe((resp:any)=>{
    //  console.log(resp);
    //  console.log('palabra maladaptive', resp.goalsmaladaptive.data[0].maladaptive);
     
      this.goalmaladaptive = resp.goalsmaladaptive.data[0];
      this.goalmaladaptiveid = resp.goalsmaladaptive.data[0].id || null;
      this.goalmaladaptive_clientId = resp.goalsmaladaptive.data[0].client_id || null;
      
      this.current_status = this.goalmaladaptive.current_status;
      this.golsto = resp.goalsmaladaptive.data[0].goalstos;
      this.gollto = resp.goalsmaladaptive.data[0].goalltos;
      

      // console.log(this.goalmaladaptive_clientId); //devuelve el client_id guardado

      //si el client_id guardado no es igual al que se esta viendo en este momento, 
      //debe traer su informacion     
      //comparamos si es igual al que tiene session activa, si no lo es 
      if (this.client_id === this.goalmaladaptive_clientId  ) {
        //si no existe no recibe nada..pero esta trayendo cosas de otras personas     
        console.log('son iguales');

      }else{
        console.log('No son iguales');

      }
      // aqui si no hay goalmaladaptive o es undefined no traigas nada para evitar el error en consola
      if (this.goalmaladaptive == undefined && this.client_id === this.goalmaladaptive_clientId ) {
        this.current_status = '';
        this.golsto = '';
        this.gollto = '';
      }else{
        // this.golsto = this.goalmaladaptive[0].goalstos;
        // console.log(this.golsto);
        // this.gollto = this.goalmaladaptive[0].goalltos;
        // console.log(this.gollto);
        
      }


      this.ngOnInit();
    },);

  }


  //selectores seleccionamos el grafico del maladaptive de la lista
  selectedMaladaptiveGraphic(maladap:any){
    this.maladaptiveSelectedSon = maladap
    // console.log(this.maladaptiveSelectedSon);
    // this.getGoalsSonMaladaptives();
  }

  deleteMaladaptiveSon(goalsto:any){debugger
    // this.maladaptiveSelectedSon.splice(i,1);
    this.goalService.deleteGoal(goalsto.id).subscribe((resp:any)=>{
      // alert("Se elimino el objetivo");
      // this.getGoals();
    })
  }

  //fin selectores



  //listas
  addSTOGoal(){
    this.golsto.push({
      maladaptive: this.maladaptiveSelected.maladaptive_behavior,
      sto: this.sto,
      status_sto: this.status_sto,
      status_sto_edit: this.status_sto,
      date_sto: this.date_sto,
      decription_sto: this.decription_sto,
    })
    this.sto = '';
    this.status_sto = '';
    this.status_sto_edit = '';
    this.date_lto = null;
    this.decription_sto = '';
  }

  deleteSTOGoal(i:any){
    this.golsto.splice(i,1);
  }

  addLTOGoal(){
    this.gollto.push({
      lto: this.lto,
      status_lto: this.status_lto,
      date_lto: this.date_lto,
      decription_lto: this.decription_lto,
    })
    this.lto = '';
    this.status_lto = '';
    this.date_lto = null;
    this.decription_lto = '';
  }

  deleteLTOGoal(i:any){
    this.gollto.splice(i,1);
  }

  cambiarStatus(goalsto:any){
    this.status_sto_edit = goalsto;
    // console.log(this.status_sto_edit.status_sto);

    let data ={
      goalstos: this.golsto,
      goalltos: this.gollto,
    }
    
    this.goalService.editGoal(data, this.goalmaladaptiveid).subscribe(
      resp =>{
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      }
    )
  }
  cambiarStatusLto(goallto:any){
    this.status_sto_edit = goallto;
    // console.log(this.status_lto_edit.status_lto);

    let data ={
      goalstos: this.golsto,
      goalltos: this.gollto,
    }
    
    this.goalService.editGoal(data, this.goalmaladaptiveid).subscribe(
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
    this.current_status = '';
    this.ngOnInit();
  }

  saveGoal(){
    this.text_validation = '';
    // if(!this.maladaptive || !this.current_status || !this.golsto){
    //   this.text_validation = 'Is required this information ';
    //   return;
    // }

    let data ={
      id:this.goalmaladaptiveid,
      bip_id: this.bip_selectedIdd,
      maladaptive: this.maladaptiveSelected.maladaptive_behavior,
      patient_id: this.patient_id,
      current_status: this.current_status,
      goalstos: this.golsto,
      goalltos: this.gollto,
      client_id: this.client_id,
    }

    if(this.client_id_goal && this.goalmaladaptiveid){

      this.goalService.editGoal(data, this.goalmaladaptiveid).subscribe((resp:any)=>{
        // console.log(resp);
        // this.text_success = 'Goal Updated'
        Swal.fire('Updated', `Goal Reduction Updated successfully!`, 'success');
        this.ngOnInit();
      })
      
    }else{
      
      this.goalService.createGoal(data).subscribe((resp:any)=>{
        console.log(resp);
        this.goalid = resp.id;
        // this.text_success = 'Goal created successfully!'
        Swal.fire('Created', `Goal Reduction Created successfully!`, 'success');
        this.ngOnInit();
        // this.getGoalsMaladaptives();
  
        // this.maladaptive = '';
        // this.goal_id = '';
        // this.current_status = '';
      })
    }

   

  }


  //grafico
  //obtenemos los goals del maladaptive por nombre  para el grafico 
  getGoalsSonMaladaptives(){
    this.goalService.listMaladaptivesGoals(this.maladaptiveSelectedSon.maladaptive_behavior, this.patient_id).subscribe((resp:any)=>{
      // console.log( resp);
      
      this.goalmaladaptive_child = resp.goalsmaladaptive.data;

      this.maladaptive_child = resp.goalsmaladaptive.data[0].maladaptive;
      // console.log(this.maladaptive_child);

      this.golsto_child = this.goalmaladaptive_child[0].goalstos;
      // console.log(this.golsto_child);

      this.gollto_child = this.goalmaladaptive_child[0].goalltos;
      // console.log(this.gollto_child);
      // this.ngOnInit();
    },);

  }

  
}
