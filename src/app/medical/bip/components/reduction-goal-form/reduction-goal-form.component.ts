import { Component } from '@angular/core';
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

  public routes = routes;

  valid_form_success: boolean = false;
  public text_validation:string = '';
  public text_success:string = '';


  public medical:any = [];
  description:any;
  name_medical:any;
  uso:any;
  
  client_id:any;
  patient_id:any;
  doctor_id:any;
  idPatient:any;
  user:any;

  client_selected:any;
  bip_selected:any;
  patient_selected:any;
  bip_id:any;

  reduction:any = [];
  

  // created comments by Malcolm Cordova at 4 feb 2004
  // mercadocreativo@gmail.com
  // @malcolmcordova
  
  //maladaptives
  
  public maladaptives:any = [];
  public title: any;
  public maladaptive_title: any;
  
  public behavior: any;
  public topografical_definition: any;
  public baseline_level: any;
  public initial_interesting: any;
  
  //goals
  maladaptiveSelected:any;
  maladaptiveSelectedSon:any;
  goalmaladaptive:any ;
  goalmaladaptive_child:any = [];
  goalReductionPatientIds:any = [];

  public goals:any = []=[];
  public goal_id:any;

  public goalstos_added:any = [];
  public goalltos_added:any = [];
  public golsto:any = [{}];
  public gollto:any = [{}];
  public golsto_child:any = [{}];
  public gollto_child:any = [{}];
  
  public current_status!:any;
  public maladaptive:any;
  public sto:any;
  public decription_sto:any;
  public lto:any;
  public description_lto:any;
  public status_sto:any;
  public status_sto_edit:any;
  public status_lto:any;
  public date_sto:Date ;
  public date_lto:Date;
  public decription_lto:any;
  public goalid:any;
  public goalsbybipid:any;
  public goal_selected:any;
  public goalpatient_selected:any;
  public bip_selectedId:any;
  public bip_selectedIdd:any;
  public maladaptive_child:any;
  public client_id_goal:any;
  public goalmaladaptiveid:any;


  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalService:GoalService,
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

  //obtenemos el bip del paciente por el id 
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
  


  //obtenemos el goal del paciente por el id 
  getGoalbyPatient(){
    
    this.goalService.getGoalbyPatientId(this.client_id).subscribe((resp:any)=>{
      // console.log('goal', resp);
      this.goalpatient_selected = resp;//convertimos la respuesta en un variable
      this.goalid = resp.id; //convertimos la respuesta en un variable

    })
    
    
  }

  //obtenemos el bip del paciente por el id 
  getProfileBip(){
    this.bipService.showBipProfile(this.client_id).subscribe((resp:any)=>{
      // console.log('profilebip', resp);
      this.client_selected = resp;//convertimos la respuesta en un variable

      this.patient_id = this.client_selected.patient.patient_id; 
      // this.idPatient = this.client_selected.patient.patient_id;
      // console.log(this.patient_id);
      if (this.patient_id != null) {
        this.getPatientGoals(this.patient_id);
      }
    });

  }

  //obtenemos los goals del paciente por el patient_id 
  getPatientGoals(patient_id){
    this.goalService.getGoalbyPatientId(patient_id).subscribe((resp:any)=>{
      // console.log('goals by patientid',resp);
      this.goals = resp.goalReductionPatientIds.data[0];
      this.client_id_goal = resp.goalReductionPatientIds.data[0].client_id;
      // this.goals = resp.goalReductionPatientIds;
      // console.log(this.goals);
      
      
    })
  }



  //obtenemos los goals por el id del bip
  getGoalsByBip(){
    this.goalService.getGoalbyBipId(this.bip_selectedId).subscribe((resp:any)=>{
      // console.log(resp);
      this.goal_selected = resp.goalreductions;
      // console.log(this.goal_selected);
      this.goalsbybipid = resp.id;
      

    })
    
  }
  

  //obtenemos informacion de la seleccion
  selectedMaladaptive(maladap:any){
    this.maladaptiveSelected = maladap
    // console.log(this.maladaptiveSelected);
    //llamamos la funcion del  servicio para obtener la informacion adicional que se va a mostrar en la ventana
    this.getGoalsMaladaptives();
    
  }

  getGoalsMaladaptives(){
    this.goalService.listMaladaptivesGoals(this.maladaptiveSelected.maladaptive_behavior).subscribe((resp:any)=>{
      // console.log( resp);
      
      this.goalmaladaptive = resp.goalsmaladaptive.data;
      this.goalmaladaptiveid = resp.goalsmaladaptive.data[0].id;
      // this.goalmaladaptive = resp.goalsmaladaptive || null;
      console.log('palabra maladaptive', this.goalmaladaptive);
      this.current_status = this.goals.current_status;

      if (this.goalmaladaptive == undefined) {
        this.current_status = '';
        this.golsto = '';
        this.gollto = '';
      }else{
        
        this.golsto = this.goalmaladaptive[0].goalstos;
        console.log(this.golsto);
        this.gollto = this.goalmaladaptive[0].goalltos;
        console.log(this.gollto);
      }

      this.ngOnInit();
    },);

  }

  selectedMaladaptiveSon(maladap:any){
    this.maladaptiveSelectedSon = maladap
    console.log(this.maladaptiveSelectedSon);
    this.getGoalsSonMaladaptives();
  }

  getGoalsSonMaladaptives(){
    this.goalService.listMaladaptivesGoals(this.maladaptiveSelectedSon.maladaptive_behavior).subscribe((resp:any)=>{
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

  deleteMaladaptiveSon(goalsto:any){debugger
    // this.maladaptiveSelectedSon.splice(i,1);
    this.goalService.deleteGoal(goalsto.id).subscribe((resp:any)=>{
      // alert("Se elimino el objetivo");
      // this.getGoals();
    })
  }
  
  // selectedMaladaptiveSon(goalm:any){
  //   this.maladaptiveSelectedSon = goalm
  //   console.log(this.maladaptiveSelectedSon);
  // }


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

  back(){
    this.maladaptiveSelected = null;
    this.maladaptiveSelectedSon = null;
    this.current_status = '';
    this.ngOnInit();
  }

  saveGoal(){debugger
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

    if(this.client_id_goal){

      this.goalService.update(data, this.goalmaladaptiveid).subscribe((resp:any)=>{
        // console.log(resp);
        // this.text_success = 'Goal Updated'
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      })
      
    }else{
      
      this.goalService.createGoal(data).subscribe((resp:any)=>{
        console.log(resp);
        this.goalid = resp.id;
        // this.text_success = 'Goal created successfully!'
        Swal.fire('Created', `Goal Created successfully!`, 'success');
        this.ngOnInit();
        // this.getGoalsMaladaptives();
  
        this.maladaptive = '';
        this.goal_id = '';
        this.current_status = '';
      })
    }

   

  }

  cambiarStatus(goalsto:any){
    this.status_sto_edit = goalsto;
    console.log(this.status_sto_edit.status_sto);
    
    this.goalService.update(goalsto, this.goalmaladaptiveid).subscribe(
      resp =>{
        // console.log(resp);
        // this.getTableData();
        Swal.fire('Updated', `Goal Updated successfully!`, 'success');
        this.ngOnInit();
      }
    )
  }
}
