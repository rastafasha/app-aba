import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientMService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  listConfigPatients(page:number=1, 
    patient_id:string='', 
    name_patient:string='', 
    email_patient:string='',
    ){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let LINK = "";
    if(patient_id){
    LINK+="&patient_id="+patient_id;
    }
    if(name_patient){
    LINK+="&name_patient="+name_patient;
    }
    if(email_patient){
    LINK+="&email_patient="+email_patient;
    }
    let URL = url_servicios+'/patients?page='+page+LINK;
    return this.http.get(URL, {headers:headers});
  }


  listPatients(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients';
    return this.http.get(URL, {headers:headers});
  }

  configPatients(page:number=1, search:string=''){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients?page='+page+"&search="+search;
    return this.http.get(URL, {headers:headers});
  }
  
  getPatient(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/show/'+client_id;
    return this.http.get(URL, {headers:headers});
  }
  getPatientsByDoctor(doctor_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/byDoctor/'+doctor_id;
    return this.http.get(URL, {headers:headers});
  }
  createPatient(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/store';
    return this.http.post(URL,data, {headers:headers});
  }
  editPatient( data:any, client_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/update/'+client_id;
    return this.http.post(URL,data,{headers:headers});
  }
  patientUpdate( data:any, client_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/patientupdate/'+client_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deletePatient(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/destroy/'+client_id;
    return this.http.delete(URL, {headers:headers});
  }

  showPatientProfile(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patients/profile/"+client_id;
    return this.http.get(URL,{headers:headers});
  }
  getPatientByPatientid(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patients/shobypatientid/"+patient_id;
    return this.http.get(URL,{headers:headers});
  }

  listConfig(): Observable<any[]>{
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/patients/config';
    return this.http.get<any[]>(URL, {headers:headers}).pipe(
      map((resp: any) => resp)
    );


    
  }


  updateStatus(data:any, client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patients/update/eligibility/"+client_id;
    return this.http.put(URL,data,{headers:headers});
  }


  //files


  storeLaboratory(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patient_file/store";
    return this.http.post(URL,data, {headers:headers});
  }

  getLaboratoryByPatient(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patient_file/showBypatient/"+patient_id;
    return this.http.get(URL,{headers:headers});
  }

  editLaboratory(data:any, laboratory_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patient_file/update/"+laboratory_id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteLaboratory(laboratory_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/patient_file/delete-file/"+laboratory_id;
    return this.http.delete(URL, {headers:headers});
  }
  
}
