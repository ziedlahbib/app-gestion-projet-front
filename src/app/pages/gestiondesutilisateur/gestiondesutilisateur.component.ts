import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-gestiondesutilisateur',
  templateUrl: './gestiondesutilisateur.component.html',
  styleUrls: ['./gestiondesutilisateur.component.scss']
})
export class GestiondesutilisateurComponent implements OnInit {

  users:User[];
  constructor(private us:UserServiceService) { }

  ngOnInit(): void {
    this.getusers();
  }
getusers(){
  this.us.getusers().subscribe(
    data=>{
      this.users=data;
    }
  )
}
}
