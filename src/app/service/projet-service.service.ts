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
  getprojetsbycdpsurl="/api/projet/get-projet-buuser";
  getprojetsbydevsurl="/api/projet/get-projet-bydevloppeur";
  supprimerurl="/api/projet/delete-projet";
  modifierprojeturl="/api/projet/update-projet";
  getprojetbyidurl="/api/projet/get-projet";
  getprojetbytacheidurl="/api/projet/get-projet-by-tacheid";
  affeterprojetcdpUrl="/api/projet/affecter-projet-cdp"
  constructor(private http : HttpClient) { }
  ajoutprojet(projet :Projet): Observable<Projet>{
    return this.http.post<Projet>(`${this.addprojetUrl}`,projet);
  }
  getprojets(): Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.getprojetssurl}`);

  }
  getprojetsbycdp(idu:Number): Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.getprojetsbycdpsurl}/${idu}`);

  }
  getprojetsbydev(idu:Number): Observable<Projet[]>{
    return this.http.get<Projet[]>(`${this.getprojetsbydevsurl}/${idu}`);

  }
  getprojetbyid(id:Number): Observable<Projet>{
    return this.http.get<Projet>(`${this.getprojetbyidurl}/${id}`);

  }
  getprojettachebyid(id:Number): Observable<Projet>{
    return this.http.get<Projet>(`${this.getprojetbytacheidurl}/${id}`);

  }
  deleteprojet(id :Number): Observable<any>{
    return this.http.delete<any>(`${this.supprimerurl}/${id}`);
  }
  modifierprojet(id:Number,projet:Projet): Observable<any>{
    return this.http.put<any>(`${this.modifierprojeturl}/${id}`,projet)}
  affecterprojetcdp(idu:Number,idp:Number,projet:any):Observable<Projet>{
      return this.http.put<Projet>(`${this.affeterprojetcdpUrl}/${idu}/${idp}`,projet);
    }
}
