import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  getbyusersurl="/api/user/get-users";
  adduserUrl="/api/auth/signup-superadmin";
  addnormaluserUrl="/api/auth/signup"
  existuserbuusernamesurl="/api/user/exist-userbyusername";
  existrbyemailsurl="/api/user/exist-userbyemail";
  getbyuserbyIdsurl="/api/user/get-user";
  supprimerurl="/api/user/delete-user"
  constructor(private http : HttpClient) { }
  getusers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.getbyusersurl}`);

  }
  existuserByusername(username :string): Observable<Boolean>{
    return this.http.get<Boolean>(`${this.existuserbuusernamesurl}/${username}`);

  }
  existuserByemail(email :string): Observable<Boolean>{
    return this.http.get<Boolean>(`${this.existrbyemailsurl}/${email}`);

  }
  ajoutuser(user :User): Observable<User>{
    return this.http.post<User>(`${this.adduserUrl}`,user);
  }
  ajounormaltuser(user :User): Observable<any>{
    return this.http.post<any>(`${this.addnormaluserUrl}`,user);
  }
  
  getuserById(iduser :Number): Observable<User>{
    return this.http.get<User>(`${this.getbyuserbyIdsurl}/${iduser}`);

  }
  deleteUser(id :Number): Observable<any>{
    return this.http.delete<any>(`${this.supprimerurl}/${id}`);
  }
}
