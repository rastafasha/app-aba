import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BipService } from 'src/app/medical/bip/service/bip.service';
import { GoalService } from 'src/app/medical/bip/service/goal.service';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { routes } from 'src/app/shared/routes/routes';

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
  option_selected:number = 1;


  public medical:any = [];
  description:any;
  name_medical:any;
  uso:any;
  
  client_id:any;
  patient_id:any;
  doctor_id:any;
  user:any;

  client_selected:any;
  bip_selected:any;
  patient_selected:any;
  bip_id:any;

  reduction:any = [];
  maladaptive:any = [];
  

  
  
  //maladaptives
  
  public maladaptives:any = [];
  public title: any;
  public maladaptive_title: any;
  
  public behavior: any;
  public topografical_definition: any;
  public baseline_level: any;
  public initial_interesting: any;
  
  //goals
  public current_status:any;
  public status:any;
  public goal:any;
  public sto:any;
  public date:any;
  public decription_goal:any;
  public goals:any = [];
  public goal_id:any;
  public lto:any;
  public description_lto:any;
  public status_lto:any;
  public date_lto:any;
  
  maladaptiveSelected:any;
  maladaptiveSelectedSon:any;
  goalmaladaptives:any = [];

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public goalService:GoalService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    
    window.scrollTo(0, 0);
    this.ativatedRoute.params.subscribe((resp:any)=>{
      this.client_id = resp.id;
      this.patient_id= resp.id
      console.log(this.client_id);
     })
     this.getProfileBip();
    this.ativatedRoute.params.subscribe( ({id}) => this.getBip(id));
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.doctor_id = this.user.id;

    this.getGoals();
    
  }

  optionSelected(value:number){
    this.option_selected = value;
  }

  
  getProfileBip(){
    this.bipService.showBipProfile(this.client_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp;

      this.patient_id = this.client_selected.patient.patient_id; 

    });
    // bip


  }
  getBip(id){
    if (id !== null && id !== undefined) {
      this.bipService.getBipByUser(+id).subscribe((resp:any)=>{
        console.log(resp);
  
        this.bip_selected = resp;
        this.maladaptives =this.bip_selected.maladaptives;
  
      })
    }
    
    
  }


  //goals
  getGoalProfile(){
    this.goalService.showGoalProfile(this.client_id).subscribe((resp:any)=>{
      console.log(resp);
      this.client_selected = resp;

      this.client_id = this.client_selected.patient.client_id; 

    });

  }
  

  
  getGoals(){
    this.goalService.listGoals().subscribe((resp:any)=>{
      console.log(resp);
      this.goals = resp.goals.data;
      // this.goal_id = resp.goals.data[0].id;

    });
    // grafico

    // this.goalService.showCitamedica(this.client_id).subscribe((resp:any)=>{
    //   // console.log(resp);

    //   this.appointment_atention_selected = resp.appointment_attention;
    //   this.medical =this.appointment_atention_selected.receta_medica;
    //   this.description =this.appointment_atention_selected.description;


    // })

  }

  selectedMaladaptive(maladap:any){
    this.maladaptiveSelected = maladap
    console.log(this.maladaptiveSelected);
    
    // this.getGoalsMaladaptives();
  }

  getGoalsMaladaptives(){
    this.goalService.listMaladaptivesGoals(this.bip_selected.maladaptives.maladaptive_behavior).subscribe((resp:any)=>{
      console.log(resp);
      this.goalmaladaptives = resp;
      // this.goal_id = resp.goals.data[0].id;
      this.decription_goal = this.goalmaladaptives.decription_goal;
      
      this.current_status = this.goalmaladaptives.baseline_level;
      this.status = this.goalmaladaptives.status;
      this.sto = this.goalmaladaptives.sto;

    });

  }

  selectedMaladaptiveSon(maladap:any){
    this.maladaptiveSelectedSon = maladap
    console.log(this.maladaptiveSelectedSon);
  }

  deleteMaladaptiveSon(goalsto:any){debugger
    // this.maladaptiveSelectedSon.splice(i,1);
    this.goalService.deleteGoal(goalsto.id).subscribe((resp:any)=>{
      // alert("Se elimino el objetivo");
      this.getGoals();
    })
  }
  deleteMaladaptiveSonLto(goallto:any){
    // this.maladaptiveSelectedSon.splice(i,1);
    this.goalService.deleteGoal(goallto.id).subscribe((resp:any)=>{
      // alert("Se elimino el objetivo");
      this.getGoals();
    })
  }
  // selectedMaladaptiveSon(goalm:any){
  //   this.maladaptiveSelectedSon = goalm
  //   console.log(this.maladaptiveSelectedSon);
  // }

  saveGoal(){
    this.text_validation = '';
    // if(!this.maladaptive_title || this.current_status || this.date){
    //   this.text_validation = 'is required add a curren status and date to this maladaptive ';
    //   return;
    // }

    let data ={
      bip_id: this.bip_selected.id,
      goal: this.maladaptiveSelected.maladaptive_behavior,
      goal_id: this.goal_id,
      current_status: this.maladaptiveSelected.baseline_level,
      status: this.status,
      sto: this.sto,
      decription_goal: this.decription_goal,
      date: this.date,
      lto: this.lto,
      description_lto: this.description_lto,
      status_lto: this.status_lto,
      date_lto: this.date_lto,
    }

    this.goalService.createGoal(data).subscribe((resp:any)=>{
      console.log(resp);
      this.text_success = 'Goal created successfully!'
      this.ngOnInit();
      // this.getGoalsMaladaptives();

      this.goal = '';
      this.goal_id = '';
      this.current_status = '';
      this.status = '';
      this.sto = '';
      this.decription_goal = '';
      this.description_lto = '';
      this.date = '';
      this.date_lto = '';
    })

  }
}
