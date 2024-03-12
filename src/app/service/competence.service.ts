import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competence } from '../model/competence';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  getCompetencesUrl="/api/competence/get-competences";
  affetercompuseUrl="/api/user/affecter-user-compenence";
  desaffetercompuseUrl="/api/user/desaffecter-user-compenence"
  addcompUrl="/api/competence/add-competence";
  supprimerurl="/api/competence/delete-competence";
  constructor(private http : HttpClient) { }
  ajoutcomp(comp :Competence): Observable<Competence>{
    return this.http.post<Competence>(`${this.addcompUrl}`,comp);
  }
  getcompetences(): Observable<Competence[]>{
    return this.http.get<Competence[]>(`${this.getCompetencesUrl}`);

  }
  affectercompuser(idu:Number,idc:Number,usercomp:any):Observable<User>{
    return this.http.put<User>(`${this.affetercompuseUrl}/${idu}/${idc}`,usercomp);
  }
  desaffectercompuser(idu:Number,idc:Number,usercomp:any):Observable<User>{
    return this.http.put<User>(`${this.desaffetercompuseUrl}/${idu}/${idc}`,usercomp);
  }
  deletecomp(id :Number): Observable<any>{
    return this.http.delete<any>(`${this.supprimerurl}/${id}`);
  }
}
