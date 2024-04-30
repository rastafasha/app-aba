import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoteRbtService {

  constructor(
    public http: HttpClient,
    public authService:AuthService
  ) { }

  


  listNotes(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/note_rbt';
    return this.http.get(URL, {headers:headers});
  }

  
  getNote(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/note_rbt/show/'+client_id;
    return this.http.get(URL, {headers:headers});
  }
  createNote(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/note_rbt/store';
    return this.http.post(URL,data, {headers:headers});
  }
  createReplacementNote(data){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/note_rbt/storeReplacemts';
    return this.http.post(URL,data, {headers:headers});
  }
  editNote( data:any, client_id:any,){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/note_rbt/update/'+client_id;
    return this.http.post(URL,data,{headers:headers});
  }
  deleteNote(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/note_rbt/destroy/'+patient_id;
    return this.http.delete(URL, {headers:headers});
  }

  showNotebyPatient(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/note_rbt/byprofile/"+patient_id;
    return this.http.get(URL,{headers:headers});
  }
  showReplacementbyPatient(patient_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/note_rbt/showReplacementBypatient/"+patient_id;
    return this.http.get(URL,{headers:headers});
  }
  showNotebyClient(client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/note_rbt/byclient/"+client_id;
    return this.http.get(URL,{headers:headers});
  }

  listConfigNote(): Observable<any[]>{
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token})
    let URL = url_servicios+'/note_rbt/config';
    return this.http.get<any[]>(URL, {headers:headers}).pipe(
      map((resp: any) => resp)
    );

    
  }

  updateStatus(data:any, client_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/note_rbt/update/status/"+client_id;
    return this.http.put(URL,data,{headers:headers});
  }



}
