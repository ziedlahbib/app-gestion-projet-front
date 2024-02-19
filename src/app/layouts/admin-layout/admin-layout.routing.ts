import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { GestiondesutilisateurComponent } from 'src/app/pages/gestiondesutilisateur/gestiondesutilisateur.component';
import { AjouterUtilisateurComponent } from 'src/app/pages/gestiondesutilisateur/ajouter-utilisateur/ajouter-utilisateur.component';
import { UpdateProfileComponent } from 'src/app/pages/gestiondesutilisateur/update-profile/update-profile.component';
import { ModifierUserComponent } from 'src/app/pages/gestiondesutilisateur/modifier-user/modifier-user.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'update-profile/:id',           component: UpdateProfileComponent },
    { path: 'update-user/:id',           component: ModifierUserComponent },
    { path: 'user-management',           component: GestiondesutilisateurComponent },
    { path: 'user-management/ajouter-utilisateur',           component: AjouterUtilisateurComponent }
];
