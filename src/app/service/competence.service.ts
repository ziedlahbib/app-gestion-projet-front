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
  affetercompuseUrl="/api/user/affecter-user-compenence"

  constructor(private http : HttpClient) { }

  getcompetences(): Observable<Competence[]>{
    return this.http.get<Competence[]>(`${this.getCompetencesUrl}`);

  }
  affectercompuser(idu:Number,idc:Number,usercomp:any):Observable<User>{
    return this.http.put<User>(`${this.affetercompuseUrl}/${idu}/${idc}`,usercomp);
  }
}
