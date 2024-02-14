import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  getbyusersurl="/api/user/get-users";
  constructor(private http : HttpClient) { }
  getusers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.getbyusersurl}`);

  }
}
