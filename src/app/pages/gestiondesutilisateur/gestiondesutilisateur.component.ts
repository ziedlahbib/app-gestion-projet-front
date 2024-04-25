import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/model/Projet';
import { Tache } from 'src/app/model/tache';
import { User } from 'src/app/model/user';
import { CompetenceService } from 'src/app/service/competence.service';
import { ProjetServiceService } from 'src/app/service/projet-service.service';
import { TacheserviceService } from 'src/app/service/tacheservice.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-gestiondesutilisateur',
  templateUrl: './gestiondesutilisateur.component.html',
  styleUrls: ['./gestiondesutilisateur.component.scss']
})
export class GestiondesutilisateurComponent implements OnInit {

  users:User[];
  initialRating: number = 5;
  taches: Tache[]=[];
  tasks: any[];
  projet:Projet[]=[];
  constructor(private us:UserServiceService,private toastrService: ToastrService,
    private ts:TacheserviceService,private ps:ProjetServiceService
    ) { }

  ngOnInit(): void {
    this.getusers();

  }
  gettachebuuserid(userId: Number, index: number) { // Add index parameter
    this.ts.gettachebyuserId(userId).subscribe(
      data => {
        this.tasks = data;
        for (let task of data) {
          if (task.status === 'en cours') {
            this.affichetachedetail(task.id.tacheId, index); // Pass index to affichetachedetail function
            console.log(task);
            this.getprojetbytacheid(task.id.tacheId, index); // Pass index to getprojetbytacheid function
          }
        }
        console.log(this.projet);
        console.log(this.taches);
      }
    );
  }
  
  getprojetbytacheid(tacheid: number, index: number) { // Add index parameter
    this.ps.getprojettachebyid(tacheid).subscribe(
      projet => {
        this.projet[index] = projet; // Assign the project to the correct index
      }
    );
  }
  
  affichetachedetail(tacheid: number, index: number) { // Add index parameter
    this.ts.gettachebyId(tacheid).subscribe(
      res => {
        this.taches[index] = res; // Assign the task to the correct index
      }
    );
  }
  getusers() {
    this.us.getusers().subscribe(
      data => {
        console.log(data);
        this.users = data;
  
        // Initialize taches and projet lists with null values
        this.taches = new Array(data.length).fill(null);
        this.projet = new Array(data.length).fill(null);
  
        for (let i = 0; i < data.length; i++) {
          const u = data[i];
          if (u.status === 'non disponible') {
            this.gettachebuuserid(u.id, i); // Pass index i to gettachebuuserid function
          } else if (u.status == null || u.status === 'disponible') {
            this.taches[i] = null;
            this.projet[i] = null;
          }
        }
      }
    );
  }
suprimer(user :any){
  this.us.deleteUser(user.id).subscribe(
    res=>{

      this.us.getusers().subscribe(
        data=>{
          this.users=data;
          this.toastrService.success(res.message)
        }
      )
    }
    
  )
}
activer(id:number,user :User){
  this.us.activeruser(id,user).subscribe(
    res=>{

      this.us.getusers().subscribe(
        data=>{
          this.users=data;
          this.toastrService.success("user activé")
        }
      )
    }
    
  )
}
desactiver(id:number,user :User){
  this.us.desactiveruser(id,user).subscribe(
    res=>{

      this.us.getusers().subscribe(
        data=>{
          this.users=data;
          this.toastrService.success("user desactivé")
        }
      )
    }
    
  )
}
getFormattedRole(role: string): string {
  if (role.startsWith('ROLE_')) {
    const formattedRole = role.replace('ROLE_', '');
    const words = formattedRole.split('_');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(' ');
  } else {
    return role; // If the role doesn't start with "ROLE_", return it as is
  }
}
}
