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
  
  getBip(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/show/'+user_id;
    return this.http.get(URL, {headers:headers});
  }
  createBip(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editBip( data:any, user_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/update/'+user_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteBip(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/destroy/'+user_id;
    return this.http.delete(URL, {headers:headers});
  }

  showBipProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/bip/profile/"+user_id;
    return this.http.get(URL,{headers:headers});
  }

  listConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/bip/config';
    return this.http.get(URL, {headers:headers});
  }

  updateStatus(data:any, patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/bip/update/eligibility/"+patient_id;
    return this.http.put(URL,data,{headers:headers});
  }
}
