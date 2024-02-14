import { Component } from '@angular/core';
import { ConsentToTreatmentService } from '../../service/consent-to-treatment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientMService } from 'src/app/medical/patient-m/service/patient-m.service';
import { BipService } from '../../service/bip.service';

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

  public analist_signature_date:string = '';
  public guardian_signature_date:string = '';

  public FILE_AVATAR:any;
  public IMAGE_PREVISUALIZA:any = 'assets/img/user-06.jpg';
  public FILE_SIGNATURE:any;
  public IMAGE_PREVISUALIZA_SIGNATURE:any = 'assets/img/user-06.jpg';

  constructor(
    public bipService:BipService,
    public patientService:PatientMService,
    public consentToTreatmentService:ConsentToTreatmentService,
    public router: Router,
    public ativatedRoute: ActivatedRoute
  ){}

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
    
  }

}
