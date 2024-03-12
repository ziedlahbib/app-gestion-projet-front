import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Competence } from 'src/app/model/competence';
import { CompetenceService } from 'src/app/service/competence.service';

@Component({
  selector: 'app-gestion-des-competence',
  templateUrl: './gestion-des-competence.component.html',
  styleUrls: ['./gestion-des-competence.component.scss']
})
export class GestionDesCompetenceComponent implements OnInit {
  competences:Competence[];
  initialRating: number = 5;
  public compform!: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router,
    private cs :CompetenceService,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getcompetence();
    this.initcompForm()
  }
getcompetence(){
  this.cs.getcompetences().subscribe(
    res=>{
      this.competences=res;
    }
  )
}
ajoutercompetence(){
  this.cs.ajoutcomp(this.compform.value).subscribe(
    data=>{
      this.toastrService.success("Compétence  ajouté avec succés")
      this.getcompetence();
    }
  )
}
initcompForm() {
  this.compform = this.formBuilder.group({
    technologies: [''],
  
  });

  this.compform.valueChanges.subscribe(
    data => {
      console.log(this.compform?.value);
      
    }
  )
}
suprimer(projet:any){
  this.cs.deletecomp(projet.id).subscribe(
    res=>{
      console.log(res)
      this.getcompetence();
    }
  )
}
}
