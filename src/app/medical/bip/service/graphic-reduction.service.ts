import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GraphicReductionService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listGraphics(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/graphic_reduction';
    return this.http.get(URL, {headers:headers});
  }
  
  getGraphic(user_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/graphic_reduction/show/'+user_id;
    return this.http.get(URL, {headers:headers});
  }

  listMaladaptivesGraphics(maladaptive:any, patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/graphic_reduction/showbyMaladaptive/'+maladaptive+'/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }
  

  listConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/graphic_reduction/config';
    return this.http.get(URL, {headers:headers});
  }

  getPatient(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/graphic_reduction/showpatient/'+patient_id;
    return this.http.get(URL, {headers:headers});
  }


  
}
