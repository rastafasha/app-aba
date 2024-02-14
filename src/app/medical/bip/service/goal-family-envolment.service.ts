import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GoalFamilyEnvolmentService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listGoalFamilyEnvolments(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/familyenvolvment';
    return this.http.get(URL, {headers:headers});
  }
  
  
  getGoalFamilyEnvolment(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/familyenvolvment/show/'+user_id;
    return this.http.get(URL, {headers:headers});
  }

  getGoalFamilyEnvolmentbyPatientId(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/familyenvolvment/showgbyPatientId/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  
  createGoalFamilyEnvolment(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/familyenvolvment/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editGoalFamilyEnvolment( data:any, user_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/familyenvolvment/update/'+user_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteGoalFamilyEnvolment(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/familyenvolvment/destroy/'+user_id;
    return this.http.delete(URL, {headers:headers});
  }

  showGoalFamilyEnvolmentProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/familyenvolvment/profile/"+user_id;
    return this.http.get(URL,{headers:headers});
  }

}
