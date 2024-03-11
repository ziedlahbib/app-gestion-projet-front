import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competence } from '../model/competence';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  getCompetencesUrl="/api/competence/get-competences"

  constructor(private http : HttpClient) { }

  getcompetences(): Observable<Competence[]>{
    return this.http.get<Competence[]>(`${this.getCompetencesUrl}`);

  }
}
