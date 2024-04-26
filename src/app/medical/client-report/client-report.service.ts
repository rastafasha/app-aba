import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientReportService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }


  listClientReports(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/client_report';
    return this.http.get(URL, {headers:headers});
  }


  listClientReportsSearch(page:number=1, search:string='', provider_name_g:number=0,session_date:string= ''){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let LINK = "";
    if(search){
      LINK+="&search="+search;
    }
    if(provider_name_g){
      LINK+="&provider_name_g="+provider_name_g;
    }
    if(session_date){
      LINK+="&session_date="+session_date;
    }
    let URL = url_servicios+'/client_report?page='+page+LINK;
    return this.http.get(URL, {headers:headers});
  }

  config(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/client_report/config';
    return this.http.get(URL, {headers:headers});
  }

  
  getClientReport(id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/client_report/show/'+id;
    return this.http.get(URL, {headers:headers});
  }
  
  editClientReport( data:any, client_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/client_report/update/'+client_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteClientReport(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/client_report/destroy/'+patient_id;
    return this.http.delete(URL, {headers:headers});
  }

  showClientReportbyPatient(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/client_report/byprofile/"+patient_id;
    return this.http.get(URL,{headers:headers});
  }

  showClientReportProfile(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/client_report/profile/"+patient_id;
    return this.http.get(URL,{headers:headers});
  }

  create(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/client_report/store';
    return this.http.post(URL,data, {headers:headers});
  }
  udpate( data:any, client_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/client_report/update/'+client_id;
    return this.http.post(URL,data,{headers:headers});
  }
}
