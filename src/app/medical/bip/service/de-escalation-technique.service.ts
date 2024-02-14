import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DeEscalationTechniqueService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listDeEscalationTechniques(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/deescalationtechnique';
    return this.http.get(URL, {headers:headers});
  }
  
  
  getDeEscalationTechnique(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/deescalationtechnique/show/'+user_id;
    return this.http.get(URL, {headers:headers});
  }

  getDeEscalationTechniquebyPatientId(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/deescalationtechnique/showgbyPatientId/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  
  createDeEscalationTechnique(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/deescalationtechnique/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editDeEscalationTechnique( data:any, user_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/deescalationtechnique/update/'+user_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteDeEscalationTechnique(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/deescalationtechnique/destroy/'+user_id;
    return this.http.delete(URL, {headers:headers});
  }

  showDeEscalationTechniqueProfile(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/deescalationtechnique/profile/"+user_id;
    return this.http.get(URL,{headers:headers});
  }
}
