import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MonitoringEvaluatingService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listMonitoringEvaluatings(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/monitoringevaluating';
    return this.http.get(URL, {headers:headers});
  }
  
  
  getMonitoringEvaluating(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/monitoringevaluating/show/'+user_id;
    return this.http.get(URL, {headers:headers});
  }

  getMonitoringEvaluatingbyPatientId(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/monitoringevaluating/showgbyPatientId/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  
  createMonitoringEvaluating(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/monitoringevaluating/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editMonitoringEvaluating( data:any, user_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/monitoringevaluating/update/'+user_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteMonitoringEvaluating(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/monitoringevaluating/destroy/'+user_id;
    return this.http.delete(URL, {headers:headers});
  }

  showMonitoringEvaluatingProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/monitoringevaluating/profile/"+user_id;
    return this.http.get(URL,{headers:headers});
  }
}
