import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../model/user';
import { AuthServiceService } from './auth-service.service';

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
  supprimerurl="/api/user/delete-user";
  modifierprofileurl="/api/user/update-profile"
  constructor(private http : HttpClient,private authService :AuthServiceService) { }
  
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
  modifierprofile(id:Number,user:User): Observable<any>{
    return this.http.put<any>(`${this.modifierprofileurl}/${id}`,user).pipe(
      tap((response: any) => {
          // If the backend returns a new token, update the authentication state
          if (response.token) {
              this.authService.setToken(response.token);
          }
      }),
      catchError(error => {
          console.error('Error updating profile:', error);
          return throwError(error);
      })
  );
  }
  private nomSubject = new BehaviorSubject<String>('');
  nom$: Observable<String> = this.nomSubject.asObservable();
  private prenomSubject = new BehaviorSubject<String>('');
  prenom$: Observable<String> = this.prenomSubject.asObservable();

  setNom(nom: String): void {
    this.nomSubject.next(nom);
  }

  getNom(): String {
    return this.nomSubject.value;
  }
  setPrenom(nom: String): void {
    this.prenomSubject.next(nom);
  }

  getPrenom(): String {
    return this.prenomSubject.value;
  }
}
