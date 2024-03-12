import { Component, OnInit } from '@angular/core';
import { Competence } from 'src/app/model/competence';
import { CompetenceService } from 'src/app/service/competence.service';

@Component({
  selector: 'app-gestion-des-competence',
  templateUrl: './gestion-des-competence.component.html',
  styleUrls: ['./gestion-des-competence.component.scss']
})
export class GestionDesCompetenceComponent implements OnInit {
  competences:Competence[];
  initialRating: number = 5
  constructor(private cs:CompetenceService) { }

  ngOnInit(): void {
    this.getcompetence();
  }
getcompetence(){
  this.cs.getcompetences().subscribe(
    res=>{
      this.competences=res;
    }
  )
}
}
