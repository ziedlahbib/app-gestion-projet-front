import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tache } from '../model/tache';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheserviceService {
  addtacheUrl="/api/tache/add-tache";
  constructor(private http : HttpClient) { }

  ajouttache(tache :Tache): Observable<Tache>{
    return this.http.post<Tache>(`${this.addtacheUrl}`,tache);
  }
}
