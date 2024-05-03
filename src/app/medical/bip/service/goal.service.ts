import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listGoals(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/goal';
    return this.http.get(URL, {headers:headers});
  }
  listMaladaptivesGoals(maladaptive:any, patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/goal/show/goalsmaladaptives/'+maladaptive+'/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  // listMaladaptivesGoals(maladaptive:any, patient_id:any){
  //   let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
  //   let URL = url_servicios+'/goal/show/goalsmaladaptives/'+maladaptive+'/'+patient_id;
  //   return this.http.get(URL, {headers:headers});
  // }
  
  getGoal(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/goal/show/'+user_id;
    return this.http.get(URL, {headers:headers});
  }

  getGoalbyPatientId(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/goal/showgbyPatientId/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  getGoalbyBipId(bip_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/goal/showBipId/'+bip_id;
    return this.http.get(URL, {headers:headers});
  }
  createGoal(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/goal/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editGoal( data:any, user_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/goal/update/'+user_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteGoal(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/goal/destroy/'+user_id;
    return this.http.delete(URL, {headers:headers});
  }

  showGoalProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/goal/profile/"+user_id;
    return this.http.get(URL,{headers:headers});
  }

  listConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/goal/config';
    return this.http.get(URL, {headers:headers});
  }

  
  updateSto(data:any, goalmaladaptiveid:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/goal/update/sto/"+goalmaladaptiveid;
    return this.http.put(URL,data,{headers:headers});
  }
}
