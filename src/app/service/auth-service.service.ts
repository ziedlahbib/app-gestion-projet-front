import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //basicauthurl="api/auth/signin";
  basicauthurl="http://localhost:8081/auth/signin";

  constructor(private http: HttpClient,private router: Router) { }
  authenticationService(data:any) :Observable<any> {
    return this.http.post<any>(`${this.basicauthurl}`,data);
  }

  registerSuccessfulLogin(data:any) {
    localStorage.setItem('autorisation',data.token);
    
    localStorage.setItem('role',data.roles);

  }

  logout() {
    localStorage.removeItem('autorisation');
    localStorage.removeItem('role');
    console.log('loging out')
    this.router.navigate(['/login']);
  }
  setToken(token: string): void {
    // Implement your logic to store the token in localStorage or wherever it's needed
    localStorage.setItem('autorisation',token);
  }

}
