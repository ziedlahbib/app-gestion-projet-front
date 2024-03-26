import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
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
    { path: '/user-management', title: 'Gestion des utilisateurs',icon:'ni-circle-08 text-pink',class: '',children: [
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
    { path: '/projets-management', title: 'Gestion des projets',icon:'ni-circle-08 text-pink',class: '',children: [
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
    { path: '/competence-management', title: 'Gestion des compétences',icon:'ni-circle-08 text-pink',class: '',children: [
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

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  toggleSubmenu(menuItem: any) {
  menuItem.showSubmenu = !menuItem.showSubmenu;
}

}
