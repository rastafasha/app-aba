import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../../doctors/service/doctor.service';
import { InsuranceService } from '../service/insurance.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-insurance-view',
  templateUrl: './insurance-view.component.html',
  styleUrls: ['./insurance-view.component.scss']
})
export class InsuranceViewComponent {
  public routes = routes;
  public selectedValue!: string;

  public insurer_name: string = '';

  public notes: any= [];
  public note: any;

  public services:any = [];
  public code: any;
  public provider: any;
  public description: any;
  public unit_prize: any;
  public hourly_fee: any;
  public max_allowed: any;

  public insurance_id: any;
  public insurance_selected: any;


  valid_form:boolean = false;
  valid_form_success:boolean = false;

  public text_success:string = '';
  public text_validation:string = '';

  
  constructor(
    public doctorService:DoctorService,
    public insuranceService:InsuranceService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private location: Location,
    
  ){

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.doctorService.closeMenuSidebar();
    this.activatedRoute.params.subscribe((resp:any)=>{
      // console.log(resp);
      this.insurance_id = resp.id;
    });

    this.getConfig();
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getConfig(){
    this.insuranceService.showInsurance(this.insurance_id).subscribe((resp:any)=>{
      // console.log(resp);
      this.insurance_selected = resp;

      this.insurer_name = this.insurance_selected.insurer_name;
      this.notes = this.insurance_selected.notes;
      this.services = this.insurance_selected.services;

    })
  }

  addService(){
    this.services.push({
      code: this.code,
      provider: this.provider,
      description: this.description,
      unit_prize: this.unit_prize,
      hourly_fee: this.hourly_fee,
      max_allowed: this.max_allowed,
    })
    this.code = '';
    this.provider = '';
    this.description = '';
    this.unit_prize = '';
    this.hourly_fee = '';
    this.max_allowed = '';
  }

  deleteService(i:any){
    this.services.splice(i,1);
  }
  addNotes(){
    this.notes.push({
      note: this.note,
    })
    this.note = '';
  }

  deleteNote(i:any){
    this.notes.splice(i,1);
  }



  save(){
    this.text_validation = '';
    if(!this.insurer_name||!this.services ){
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    const data ={
      insurer_name:this.insurer_name,
      services:this.services,
      notes:this.notes,
    }
    
    
    this.insuranceService.editInsurance(data,this.insurance_id).subscribe((resp:any)=>{
      // console.log(resp);
      
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = 'El insurance ha sido registrado correctamente';

        this.router.navigate(['/insurance/list']);
      }
    })


  }

}
