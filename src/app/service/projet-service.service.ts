import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../model/Projet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetServiceService {
  addprojetUrl="/api/projet/add-projet";
  getprojetssurl="/api/projet/get-projets";
  supprimerurl="/api/projet/delete-projet";
  modifierprojeturl="/api/projet/update-projet";
  getprojetbyidurl="/api/projet/get-projet";
  constructor(private http : HttpClient) { }
  ajoutprojet(projet :Projet): Observable<Projet>{
    return this.http.post<Projet>(`${this.addprojetUrl}`,projet);
  }
  getprojets(): Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.getprojetssurl}`);

  }
  getprojetbyid(id:Number): Observable<Projet>{
    return this.http.get<Projet>(`${this.getprojetbyidurl}/${id}`);

  }
  deleteprojet(id :Number): Observable<any>{
    return this.http.delete<any>(`${this.supprimerurl}/${id}`);
  }
  modifierprojet(id:Number,projet:Projet): Observable<any>{
    return this.http.put<any>(`${this.modifierprojeturl}/${id}`,projet)}
}
