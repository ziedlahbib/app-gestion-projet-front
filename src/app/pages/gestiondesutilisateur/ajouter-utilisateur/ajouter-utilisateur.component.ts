import { Component, OnInit } from '@angular/core';
import { ERole } from 'src/app/model/erole';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { technologies } from 'src/app/model/Technologies';
@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.scss']
})
export class AjouterUtilisateurComponent implements OnInit {

  erole=ERole;
  tech=technologies;
  constructor() { }

  ngOnInit(): void {
  }

}
