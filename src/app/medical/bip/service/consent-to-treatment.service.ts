import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConsentToTreatmentService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listConsentToTreatments(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/consenttotreatment';
    return this.http.get(URL, {headers:headers});
  }
  
  
  getConsentToTreatment(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/consenttotreatment/show/'+user_id;
    return this.http.get(URL, {headers:headers});
  }

  getConsentToTreatmentbyPatientId(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/consenttotreatment/showgbyPatientId/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  
  createConsentToTreatment(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/consenttotreatment/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editConsentToTreatment( data:any, user_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/consenttotreatment/update/'+user_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteConsentToTreatment(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/consenttotreatment/destroy/'+user_id;
    return this.http.delete(URL, {headers:headers});
  }

  showConsentToTreatmentProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/consenttotreatment/profile/"+user_id;
    return this.http.get(URL,{headers:headers});
  }
}
