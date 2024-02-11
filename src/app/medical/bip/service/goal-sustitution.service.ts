import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoalSustitutionService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listGoalSustitutions(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/sustitutiongoal';
    return this.http.get(URL, {headers:headers});
  }
  listMaladaptivesGoalSustitutions(maladaptive:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/sustitutiongoal/show/goalsmaladaptives/'+maladaptive;
    return this.http.get(URL, {headers:headers});
  }
  // listMaladaptivesGoals(maladaptive:any, patient_id:any){
  //   let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
  //   let URL = url_servicios+'/goal/show/goalsmaladaptives/'+maladaptive+'/'+patient_id;
  //   return this.http.get(URL, {headers:headers});
  // }
  
  getGoalSustitution(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/sustitutiongoal/show/'+user_id;
    return this.http.get(URL, {headers:headers});
  }

  getGoalSustitutionbyPatientId(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/sustitutiongoal/showgbyPatientId/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  getGoalSustitutionbyBipId(bip_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/sustitutiongoal/showBipId/'+bip_id;
    return this.http.get(URL, {headers:headers});
  }
  createGoalSustitution(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/sustitutiongoal/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editGoalSustitution( data:any, user_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/sustitutiongoal/update/'+user_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteGoalSustitution(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/sustitutiongoal/destroy/'+user_id;
    return this.http.delete(URL, {headers:headers});
  }

  showGoalSustitutionProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/sustitutiongoal/profile/"+user_id;
    return this.http.get(URL,{headers:headers});
  }

  listConfigSustitution(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/sustitutiongoal/config';
    return this.http.get(URL, {headers:headers});
  }

  updateStoSustitutionSto(data:any, goalmaladaptiveid:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/sustitutiongoal/update/sto/"+goalmaladaptiveid;
    return this.http.put(URL,data,{headers:headers});
  }
}
