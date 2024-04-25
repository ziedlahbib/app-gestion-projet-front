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
  gettacheuserIdUrl="/api/tache/get-tachesByUserId"
  affetercomptacheUrl="/api/tache/affecter-tache-compenence";
  desaffetercomptacheUrl="/api/tache/desaffecter-tache-compenence";
  affetertacheprojetUrl="/api/tache/affecter-tache-projet";
  todotachedevUrl="/api/tache/todo-tache-dev";
  voirnotifUrl="/api/tache/voir-notif";
  affetertachedevUrl="/api/tache/affecter-tache-dev";
  desaffetertachedevUrl="/api/tache/desaffecter-tache-dev";
  gettachebyIdUrl="/api/tache/get-tache";
  gettacheuserrateIdUrl="/api/tache/rate-user-tache-number";
  rateurl="/api/tache/rate-user-tache"
  constructor(private http : HttpClient) { }
  rate(note: number, idt: number, idu: number): Observable<any> {
    // Create an object with the note as a property
    const requestBody = { note: note };
  console.log(requestBody)
    // Send the object as the request body
    return this.http.put<any>(`${this.rateurl}/${idt}/${idu}`, requestBody.note);
  }
  
  
  
  gettachebyprojet(idp:Number): Observable<Tache[]>{
    return this.http.get<Tache[]>(`${this.gettachebyprojetUrl}/${idp}`);

  }
  gettachebyuserId(idu:Number): Observable<any[]>{
    return this.http.get<any[]>(`${this.gettacheuserIdUrl}/${idu}`);

  }
  gettachebyId(idt:Number): Observable<Tache>{
    return this.http.get<Tache>(`${this.gettachebyIdUrl}/${idt}`);

  }
  gettacheuserrateId(idt:Number,idu:Number): Observable<Number>{
    return this.http.get<Number>(`${this.gettacheuserrateIdUrl}/${idt}/${idu}`);

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
  voirnotif(idu:Number,idt:Number,tache:any):Observable<any>{
    return this.http.put<any>(`${this.voirnotifUrl}/${idu}/${idt}`,tache);
  }
  todotachedev(idu:Number,idt:Number,tache:any):Observable<any>{
    return this.http.put<any>(`${this.todotachedevUrl}/${idu}/${idt}`,tache);
  }
  affectertachedev(idu:Number,idt:Number,tache:any):Observable<any>{
    return this.http.put<any>(`${this.affetertachedevUrl}/${idu}/${idt}`,tache);
  }
  desaffectertachedev(idu:Number,idt:Number,tache:any):Observable<any>{
    return this.http.put<any>(`${this.desaffetertachedevUrl}/${idu}/${idt}`,tache);
  }
}
