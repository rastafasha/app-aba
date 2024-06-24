import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, of } from 'rxjs';
import { url_servicios } from 'src/app/config/config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user:any;
  token:any;

  constructor(
    private router: Router,
    public http: HttpClient
    ) {
      this.getLocalStorage();//devuelve el usuario logueado
    }

  
    getLocalStorage(){
      if(localStorage.getItem('token') && localStorage.getItem('user')){
        let USER = localStorage.getItem('user');
        this.user = JSON.parse(USER ? USER: '');
      }else{
        this.user = null;
      }
   }

   saveLocalStorage(auth:any){
    if(auth && auth.access_token){
      localStorage.setItem("token",auth.access_token.original.access_token);
      localStorage.setItem("user",JSON.stringify(auth.user));
      localStorage.setItem('authenticated', 'true');
      return true;
    }
    return false;
  }

  

   
  login(email:string,password:string) {
     let URL = url_servicios+"/login";
    return this.http.post(URL,{email: email,password: password}).pipe(
      map((auth:any) => {
        console.log(auth);
        const result = this.saveLocalStorage(auth);
        return result;
      }),
      catchError((error:any) => {
        console.log(error);
        return of(undefined);
      })
    );
  }


  
 getUserRomoto(data){
  let headers = new HttpHeaders({'Authorization': 'Bearer'+this.token})
  let URL = url_servicios+'/me';
  return this.http.post(URL,data, {headers:headers});
 }
  

 

 logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('authenticated');
  localStorage.removeItem('auth_token');
  this.router.navigate([routes.login]);
 }


}
