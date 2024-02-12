import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //basicauthurl="api/auth/signin";
  basicauthurl="http://localhost:8081/auth/signin";

  constructor(private http: HttpClient) { }
  authenticationService(data:any) :Observable<any> {
    return this.http.post<any>(`${this.basicauthurl}`,data);
  }

  registerSuccessfulLogin(data:any) {
    localStorage.setItem('autorisation',data.accessToken);
    console.log(data.roles[0])
    localStorage.setItem('role',data.roles[0]);

  }

  logout() {
    localStorage.removeItem('autorisation');
  }

}
