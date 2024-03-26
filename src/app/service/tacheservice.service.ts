import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tache } from '../model/tache';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheserviceService {
  addtacheUrl="/api/tache/add-tache";
  updatetacheUrl="/api/tache/update-tache";
  deletetacheUrl="/api/tache/delete-tache";
  gettachebyprojetUrl="/api/tache/get-tache-byprojet";
  affetercomptacheUrl="/api/tache/affecter-tache-compenence";
  desaffetercomptacheUrl="/api/tache/desaffecter-tache-compenence";
  affetertacheprojetUrl="/api/tache/affecter-tache-projet";
  gettachebyIdUrl="/api/tache/get-tache";
  constructor(private http : HttpClient) { }
  gettachebyprojet(idp:Number): Observable<Tache[]>{
    return this.http.get<Tache[]>(`${this.gettachebyprojetUrl}/${idp}`);

  }
  gettachebyId(idt:Number): Observable<Tache>{
    return this.http.get<Tache>(`${this.gettachebyIdUrl}/${idt}`);

  }
  updatetache(idt:Number,tache:Tache): Observable<Tache>{
    return this.http.put<Tache>(`${this.updatetacheUrl}/${idt}`,tache);

  }
  deletetache(id :Number): Observable<any>{
    return this.http.delete<any>(`${this.deletetacheUrl}/${id}`);
  }
  ajouttache(tache :Tache): Observable<Tache>{
    return this.http.post<Tache>(`${this.addtacheUrl}`,tache);
  }
  affectercomptache(idt:Number,idc:Number,tache:any):Observable<void>{
    return this.http.put<void>(`${this.affetercomptacheUrl}/${idt}/${idc}`,tache);
  }
  desaffectercomptache(idt:Number,idc:Number,tache:any):Observable<void>{
    return this.http.put<void>(`${this.desaffetercomptacheUrl}/${idt}/${idc}`,tache);
  }
  affectertacheprojet(idp:Number,idt:Number,tache:any):Observable<Tache>{
    return this.http.put<Tache>(`${this.affetertacheprojetUrl}/${idp}/${idt}`,tache);
  }
}
