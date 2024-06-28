import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatitstiqueService {
  mostusertaskUrl="/api/statistic/most-tasks";
  projectpermonthurl="/api/statistic/projects-per-month";
  constructor(private http : HttpClient) { }
  getmostusertask(): Observable<any>{
    return this.http.get<any>(`${this.mostusertaskUrl}`);

  }

  getProjectsPerMonth(year: number): Observable<any[]> {
    let params = new HttpParams().set('year', year.toString());
    return this.http.get<any[]>(this.projectpermonthurl, { params });
  }
}
