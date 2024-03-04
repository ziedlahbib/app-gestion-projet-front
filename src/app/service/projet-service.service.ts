import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../model/Projet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetServiceService {
  addprojetUrl="/api/projet/add-projet";
  constructor(private http : HttpClient) { }
  ajoutprojet(projet :Projet): Observable<Projet>{
    return this.http.post<Projet>(`${this.addprojetUrl}`,projet);
  }
}
