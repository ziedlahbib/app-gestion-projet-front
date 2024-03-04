import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/model/Projet';
import { ProjetServiceService } from 'src/app/service/projet-service.service';



@Component({
  selector: 'app-ajouterprojet',
  templateUrl: './ajouterprojet.component.html',
  styleUrls: ['./ajouterprojet.component.scss']
})
export class AjouterprojetComponent implements OnInit {
  public projetform!: FormGroup;
  projet:Projet;
  constructor(private ps: ProjetServiceService,private formBuilder: FormBuilder, private route: Router,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.projetform = this.formBuilder.group({
      nom_projet: ['', [Validators.required]],
      date_limite: ['', Validators.required],

    
    });
    this.projetform.valueChanges.subscribe(
      data => {
        console.log(this.projetform?.value);
        
      }
    )
  }

  ajouter() {
    // const formattedDate = this.formatDate(this.projetform.value.date_limite);

    // // Create a new object with the formatted date
    // const formData = {
    //   ...this.projetform.value,
    //   date_limite: formattedDate
    // };
    this.ps.ajoutprojet(this.projetform.value).subscribe(
      data => {
        console.log(data)
        this.toastrService.success("projet ajouté avec succés")
        this.route.navigate(['/projets-management']);
  
      }
    )
  }
}
