import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { User } from 'src/app/model/user';
import { jwtDecode } from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isReady: boolean = false;
  nom: String = '';
  prenom: String = '';
  public focus;
  public listTitles: any[];
  public location: Location;
  user: User;

  constructor(location: Location, private element: ElementRef, private router: Router,
    private authenticationService: AuthServiceService, private us: UserServiceService) {
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
    return 'Dashboard';
  }

  logout() {
    this.authenticationService.logout();
  }

  getuserbyid() {
    let token = localStorage.getItem('autorisation' || '');
    let user: any = jwtDecode(token || '');
    this.us.getuserById(user.jti).subscribe(
      data => {
        console.log(data);
        this.user = data;
        this.nom=data.nom;
        this.prenom=data.prenom
        this.isReady = true;
      }
    )
  }
}
