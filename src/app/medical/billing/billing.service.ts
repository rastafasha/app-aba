import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }


  listBillings(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/billing';
    return this.http.get(URL, {headers:headers});
  }
  config(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/billing/config';
    return this.http.get(URL, {headers:headers});
  }

  
  getBilling(id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/billing/show/'+id;
    return this.http.get(URL, {headers:headers});
  }
  
  editBilling( data:any, client_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/billing/update/'+client_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteBilling(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/billing/destroy/'+patient_id;
    return this.http.delete(URL, {headers:headers});
  }

  showBillingbyPatient(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/billing/byprofile/"+patient_id;
    return this.http.get(URL,{headers:headers});
  }

  showBillingProfile(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/billing/profile/"+patient_id;
    return this.http.get(URL,{headers:headers});
  }

}
