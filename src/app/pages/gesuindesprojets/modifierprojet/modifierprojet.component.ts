import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/model/Projet';
import { ProjetServiceService } from 'src/app/service/projet-service.service';
import { DatePipe } from '@angular/common';
import { TacheserviceService } from 'src/app/service/tacheservice.service';
import { Competence } from 'src/app/model/competence';
import { CompetenceService } from 'src/app/service/competence.service';
@Component({
  selector: 'app-modifierprojet',
  templateUrl: './modifierprojet.component.html',
  styleUrls: ['./modifierprojet.component.scss']
})
export class ModifierprojetComponent implements OnInit {
  projet:Projet;
  isReady:boolean=false;
  showform:boolean=false;
  public projetform!: FormGroup;
  public tacheform!: FormGroup;
  public compform!: FormGroup;
  competencelist:Competence[];
  competencelistef: any[] = [];
  constructor(private formBuilder: FormBuilder, private route: Router,
    private router:ActivatedRoute,private ps:ProjetServiceService,private toastrService: ToastrService,
    private ts:TacheserviceService,private cs :CompetenceService) { }

  ngOnInit(): void {
    this.get(this.router.snapshot.params['id']);
    this.initFormTAche();
    this.initformcomp();
    this.getcompetences();
  }
  addNewForm(): void {
    // Create a new form group for the new form
    const newFormGroup = this.formBuilder.group({
      selectedCompetenceId: ['', Validators.required]
    });
  
    // Add the new form group to the list of forms
    this.competencelistef.push(newFormGroup);
    console.log(this.competencelistef); // Log the array for debugging
  }
  
  getcompetences(){
    this.cs.getcompetences().subscribe(
      res=>{
        this.competencelist=res;
      }
    )
  }
  initForm(data) {
    this.projetform = this.formBuilder.group({
      nom_projet: [data?.nom_projet, [Validators.required]],
      date_limite: [this.formatDate(data?.date_limite), Validators.required],
    });
    this.projetform.valueChanges.subscribe(
      data => {
        console.log(this.projetform?.value);
      }
    ) 
  }
  show(){
    this.showform=!this.showform
  }
  initFormTAche(){
    this.tacheform = this.formBuilder.group({
      description: ['', [Validators.required]],
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
    });
    this.tacheform.valueChanges.subscribe(
      data => {
        console.log(this.tacheform?.value);
      }
    )
  }
  initformcomp(){
    this.compform = this.formBuilder.group({
      selectedCompetenceId: ['', [Validators.required]],
    });
    this.compform.valueChanges.subscribe(
      data => {
        console.log(this.compform?.value);
      }
    )
  }
  get(id:number){
    this.ps.getprojetbyid(id ).subscribe(
      data => {
        this.projet = data;
        console.log(data);
        this.isReady=true;
        this.initForm(data);
      }
    );
  }
  modifier(){
    this.ps.modifierprojet(this.router.snapshot.params['id'],this.projetform.value).subscribe(
      data=>{
        console.log(data);
        this.toastrService.success("projet modifié avec succés")
        this.route.navigate(['/projets-management']);
      }
    )
  }
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const datePipe = new DatePipe('en-US'); // Change 'en-US' to your desired locale
    return datePipe.transform(formattedDate, 'yyyy-MM-dd'); // Adjust the format as needed
  }
}
