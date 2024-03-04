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
  constructor(private http : HttpClient) { }
  ajoutprojet(projet :Projet): Observable<Projet>{
    return this.http.post<Projet>(`${this.addprojetUrl}`,projet);
  }
  getprojets(): Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.getprojetssurl}`);

  }
  deleteprojet(id :Number): Observable<any>{
    return this.http.delete<any>(`${this.supprimerurl}/${id}`);
  }
}
