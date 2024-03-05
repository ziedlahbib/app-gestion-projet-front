import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/model/Projet';
import { ProjetServiceService } from 'src/app/service/projet-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-modifierprojet',
  templateUrl: './modifierprojet.component.html',
  styleUrls: ['./modifierprojet.component.scss']
})
export class ModifierprojetComponent implements OnInit {
  projet:Projet;
  isReady:boolean=false;
  public projetform!: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router,
    private router:ActivatedRoute,private ps:ProjetServiceService,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.get(this.router.snapshot.params['id'])
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
