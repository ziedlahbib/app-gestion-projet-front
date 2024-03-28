import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    visibility?: boolean;
    children?: RouteInfo[];
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: ''  },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '', },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    { path: '/user-management', title: 'Gestion des utilisateurs',icon:'ni-circle-08 text-pink',visibility:true,class: '',children: [
      {
        path: '/user-management/ajouter-utilisateur',
        title: 'Ajouter un utilisateur',
        icon: '',
        class: ''
      },
      {
        path: '/user-management',
        title: 'Afficher les utilisateurs',
        icon: '',
        class: ''
      }
    ]},
    { path: '/projets-management', title: 'Gestion des projets',icon:'ni-circle-08 text-pink',visibility:true,class: '',children: [
      {
        path: '/projets-management/ajouter-projet',
        title: 'Ajouter un projet',
        icon: '',
        class: ''
      },
      {
        path: '/projets-management',
        title: 'Afficher les projets',
        icon: '',
        class: ''
      }
    ]},
    { path: '/competence-management', title: 'Gestion des compétences',icon:'ni-circle-08 text-pink',visibility:true,class: '',children: [
      {
        path: '/competence-management',
        title: 'Afficher les competences',
        icon: '',
        class: ''
      }
    ]}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isReady: boolean = false;
  user: User;
  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router,private us: UserServiceService) { }

  ngOnInit() {
    this.getuserbyid();
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItems = ROUTES.map((route) => ({
      ...route,
      visibility: this.checkRouteVisibility(route.path),
  }));
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
   
  }
  toggleSubmenu(menuItem: any) {
  menuItem.showSubmenu = !menuItem.showSubmenu;
  
}
getuserbyid() {
  let token = localStorage.getItem('autorisation' || '');
  let user: any = jwtDecode(token || '');
  this.us.getuserById(user.jti).subscribe(
    data => {
      console.log(data);
      this.isReady = true;
      this.user = data;

    }
  )
}
isSuperadmin():boolean{
  let role = localStorage.getItem('role' || '');
  return role=="ROLE_SUPERADMIN";
}
isChefProjet():boolean{
  let role = localStorage.getItem('role' || '');
  return role=="ROLE_CHEF_DE_PROJET";
}
isResponsable():boolean{
  let role = localStorage.getItem('role' || '');
  return role=="ROLE_RESPONSABLE";
}
isDeveloppeur():boolean{
  let role = localStorage.getItem('role' || '');
  return role=="ROLE_RESPONSABLE";
}
checkRouteVisibility(path: string): boolean {
  // Check the path to determine visibility based on user role
  switch (path) {
    case '/user-management':
      return this.isSuperadmin();
    // Add more cases for other paths as needed
    case '/projets-management':
      return this.isSuperadmin() ||this.isChefProjet()||this.isResponsable();
    case '/competence-management':
      return this.isSuperadmin();
    default:
      return false; // By default, hide routes that don't require special visibility conditions
  }
}

}
