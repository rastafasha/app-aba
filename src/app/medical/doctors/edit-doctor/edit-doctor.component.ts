import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrls: ['./edit-doctor.component.scss']
})
export class EditDoctorComponent {
  public routes = routes;
  public selectedValue!: string;

  public name: string = '';
  public surname: string = '';
  public phone: any;
  public email: string = '';
  public password: string = '';
  public password_confirmation: string = '';
  public birth_date: string = '';
  public gender: number = 1;
  public education: string = '';
  public designation: string = '';
  public address: string = '';

  public roles:any = [];
  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any = 'assets/img/user-06.jpg';

  valid_form:boolean = false;
  valid_form_success:boolean = false;

  public text_success:string = '';
  public text_validation:string = '';

  public speciality_id:any;
  public specialities:any = [];
  public hours_days:any =[];
  public hours_selecteds:any = [];
  public days_week = [
    {
      day:'Lunes',
      class: 'table-primary'
    },
    {
      day:'Martes',
      class: 'table-secondary'
    },
    {
      day:'Miercoles',
      class: 'table-success'
    },
    {
      day:'Jueves',
      class: 'table-warning'
    },
    {
      day:'Viernes',
      class: 'table-info'
    },
  ];

  public doctor_id:any;
  public doctor_selected:any;

  constructor(
    public doctorService:DoctorService,
    public router: Router,
    public activatedRoute:ActivatedRoute
  ){

  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.params.subscribe((resp:any)=>{
      // console.log(resp);
      this.doctor_id = resp.id;
    });

    this.getConfig();
  }

  getConfig(){
    this.doctorService.listConfig().subscribe((resp:any)=>{
      // console.log(resp);
      this.roles = resp.roles;
      this.specialities = resp.specialities;
      this.hours_days = resp.hours_days;

      this.doctorService.showDoctor(this.doctor_id).subscribe((resp:any)=>{
        // console.log(resp);
        this.doctor_selected = resp.user;

        this.selectedValue = this.doctor_selected.roles.id;
        this.name = this.doctor_selected.name;
        this.surname = this.doctor_selected.surname;
        this.phone = this.doctor_selected.phone;
        this.email = this.doctor_selected.email;
        this.birth_date = new Date(this.doctor_selected.birth_date).toISOString();
        this.education = this.doctor_selected.education;
        this.designation = this.doctor_selected.designation;
        this.gender = this.doctor_selected.gender;
        this.address = this.doctor_selected.address;
        this.IMAGE_PREVISUALIZA = this.doctor_selected.avatar;
      })
      
    })
  }

  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image")){
      this.text_validation = 'Solamente pueden ser archivos de tipo imagen';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = ()=> this.IMAGE_PREVISUALIZA = reader.result;
  }

  save(){
    this.text_validation = '';
    this.text_success = '';
    if(!this.name||!this.email ||!this.surname ){
      this.text_validation = 'Los campos con * son obligatorios';
      return;
    }

    if(this.password ){
      if(this.password != this.password_confirmation  ){
        this.text_validation = 'Las contraseña debe ser igual';
        return;
      }
    }

    console.log(this.selectedValue);

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('phone', this.phone);
    formData.append('email', this.email);
    formData.append('birth_date', this.birth_date);
    formData.append('gender', this.gender+'');

    if(this.selectedValue ){
      formData.append('role_id', this.selectedValue);
    }
    if(this.address ){
      formData.append('address', this.address);
    }
    
    if(this.password ){
      formData.append('password', this.password);
    }
    this.FILE_AVATAR  = this.IMAGE_PREVISUALIZA;
    if(this.FILE_AVATAR ){
      formData.append('imagen', this.FILE_AVATAR);
    }

    this.doctorService.editDoctor(formData, this.doctor_id).subscribe((resp:any)=>{
      // console.log(resp);
      
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = 'El usuario ha sido actualizado correctamente';
      }
    })


  }

}

