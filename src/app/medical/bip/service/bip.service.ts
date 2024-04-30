import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BipService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listBips(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip';
    return this.http.get(URL, {headers:headers});
  }
  
  getBip(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/show/'+client_id;
    return this.http.get(URL, {headers:headers});
  }
  getBipByUser(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/show/byuser/'+client_id;
    return this.http.get(URL, {headers:headers});
  }
  getBipByPatient_id(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/show/byuserpatientid/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  getBipProfilePatient_id(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/profileBip/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }

  getBipProfilePatientPdf_id(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/profileBipPdf/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  createBip(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editBip( data:any, client_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/update/'+client_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteBip(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/destroy/'+client_id;
    return this.http.delete(URL, {headers:headers});
  }

  showBipProfile(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/bip/profile/"+patient_id;
    return this.http.get(URL,{headers:headers});
  }
  showBipPatientId(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/bip/byuserpatientid/"+patient_id;
    return this.http.get(URL,{headers:headers});
  }

  listConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/config';
    return this.http.get(URL, {headers:headers});
  }

  update(data:any, client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/bip/update/"+client_id;
    return this.http.put(URL,data,{headers:headers});
  }
  updateStatus(data:any, client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/bip/update/eligibility/"+client_id;
    return this.http.put(URL,data,{headers:headers});
  }
}
