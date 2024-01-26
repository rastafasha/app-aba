import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url_servicios } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,

  ) { }

  
  listInsurances(page:number=1, insurer_name:string=''){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let LINK = "";
    if(insurer_name){
      LINK+="&insurer_name="+insurer_name;
    }
    
    let URL = url_servicios+'/insurance?page='+page+LINK;
    return this.http.get(URL, {headers:headers});
  }

  storeInsurance(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/insurance/store";
    return this.http.post(URL,data, {headers:headers});
  }

  showInsurance(insurance_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/insurance/show/"+insurance_id;
    return this.http.get(URL,{headers:headers});
  }

  editInsurance(data:any, insurance_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/insurance/update/"+insurance_id;
    return this.http.put(URL,data,{headers:headers});
  }
  

  deleteInsurance(insurance_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/insurance/destroy/"+insurance_id;
    return this.http.delete(URL, {headers:headers});
  }
  
  storeInsuranceService(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/insurance/store/service";
    return this.http.post(URL,data, {headers:headers});
  }

  getServices(){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/insurance/service";
    return this.http.get(URL, {headers:headers});
  }
  getServicebyInsurance(insurance_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/insurance/servicebyInsurance/"+insurance_id;
    return this.http.get(URL, {headers:headers});
  }

  deleteInsuranceService(service_id:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = url_servicios+"/insurance/destroy/service/"+service_id;
    return this.http.delete(URL, {headers:headers});
  }

}
