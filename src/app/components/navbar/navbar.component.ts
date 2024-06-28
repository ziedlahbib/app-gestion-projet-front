import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { DatePipe, Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { User } from 'src/app/model/user';
import { jwtDecode } from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';
import { TacheserviceService } from 'src/app/service/tacheservice.service';
import { ProjetServiceService } from 'src/app/service/projet-service.service';
import { Tache } from 'src/app/model/tache';
import { Projet } from 'src/app/model/Projet';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isReady: boolean = false;
  nom: String = '';
  prenom: String = '';
  id: String = '';
  public focus;
  public listTitles: any[];
  public location: Location;
  user: User;
  taches: Tache[]=[];
  tasks: any[];
  projet:Projet[]=[];
  notif: number = 0;
  imageUrl: string;
  constructor(location: Location, private element: ElementRef, private router: Router,
    private authenticationService: AuthServiceService, private us: UserServiceService,
    private ts: TacheserviceService,private ps:ProjetServiceService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getuserbyid();

    this.us.nom$.subscribe((nom) => {
      this.nom = nom;
    });

    this.us.prenom$.subscribe((prenom) => {
      this.prenom = prenom;
    });
    this.us.id$.subscribe((id) => {
      this.id = id;
      console.log(this.id)
    });
  }
  voirnotif(tache:any){
    this.ts.voirnotif(this.user.id,tache.id,tache).subscribe(
      data=>{
        if(this.notif>0){
          this.notif--;
          localStorage.setItem('notif',JSON.stringify(this.notif));

        }

      }
    )
  }
  gettachebuuserid(userId: Number) {
    this.ts.gettachebyuserId(userId).subscribe(
      data => {

        this.tasks = data;
        for (let task of data) {
          this.affichetachedetail(task.id.tacheId);
          this.getprojetbytacheid(task.id.tacheId);
          if(task.etat=="non lu"){
           this.notif++;
          }
  
          localStorage.setItem('notif',JSON.stringify(this.notif));
        }

      }
    )
  }
  getprojetbytacheid(tacheid:Number){
    this.ps.getprojettachebyid(tacheid).subscribe(
      projet=>{
   
        this.projet.push(projet);
      }
    )
  }
  affichetachedetail(tacheid: Number) {
    this.ts.gettachebyId(tacheid).subscribe(
      res => {

        this.taches.push(res);
  
      }
    )
  }
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const datePipe = new DatePipe('en-US'); // Change 'en-US' to your desired locale
    return datePipe.transform(formattedDate, 'yyyy-MM-dd'); // Adjust the format as needed
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return '';
  }

  logout() {
    this.authenticationService.logout();
  }

  getuserbyid() {
    let token = localStorage.getItem('autorisation' || '');
    let user: any = jwtDecode(token || '');
    this.us.getuserById(user.jti).subscribe(
      data => {

        this.user = data;
        this.nom=data.nom;
        this.prenom=data.prenom;
        if(data.file!=null){
          this.id=data.file.id.toString();
          console.log(this.id)
          this.imageUrl = `http://localhost:8081/File/file/${this.user.file.id}`;
        console.log(this.imageUrl);
        }
        else{
          this.id=null;
        }
        this.gettachebuuserid(data.id);
        this.isReady = true;
      }
    )
  }
  showNotifications: boolean = false;

toggleNotifications() {
  this.showNotifications = !this.showNotifications;
}

}
