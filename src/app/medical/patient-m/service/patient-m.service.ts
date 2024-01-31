import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientMService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listPatients(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients';
    return this.http.get(URL, {headers:headers});
  }

  configPatients(page:number=1, search:string=''){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients?page='+page+"&search="+search;
    return this.http.get(URL, {headers:headers});
  }
  
  getPatient(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/show/'+client_id;
    return this.http.get(URL, {headers:headers});
  }
  createPatient(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editPatient( data:any, client_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/update/'+client_id;
    return this.http.post(URL,data,{headers:headers});
  }
  patientUpdate( data:any, client_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/patientupdate/'+client_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deletePatient(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/destroy/'+client_id;
    return this.http.delete(URL, {headers:headers});
  }

  showPatientProfile(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patients/profile/"+client_id;
    return this.http.get(URL,{headers:headers});
  }

  listConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/config';
    return this.http.get(URL, {headers:headers});
  }

  updateStatus(data:any, client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patients/update/eligibility/"+client_id;
    return this.http.put(URL,data,{headers:headers});
  }
  
}
