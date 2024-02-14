import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CrisisPlanService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listCrisisPlans(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/crisisplan';
    return this.http.get(URL, {headers:headers});
  }
  
  
  getCrisisPlan(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/crisisplan/show/'+user_id;
    return this.http.get(URL, {headers:headers});
  }

  getCrisisPlanbyPatientId(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/crisisplan/showgbyPatientId/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  
  createCrisisPlan(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/crisisplan/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editCrisisPlan( data:any, user_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/crisisplan/update/'+user_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteCrisisPlan(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/crisisplan/destroy/'+user_id;
    return this.http.delete(URL, {headers:headers});
  }

  showCrisisPlanProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/crisisplan/profile/"+user_id;
    return this.http.get(URL,{headers:headers});
  }
}
