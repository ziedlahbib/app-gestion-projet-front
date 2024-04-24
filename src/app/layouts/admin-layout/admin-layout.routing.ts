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
import { GesuindesprojetsComponent } from 'src/app/pages/gesuindesprojets/gesuindesprojets.component';
import { AjouterprojetComponent } from 'src/app/pages/gesuindesprojets/ajouterprojet/ajouterprojet.component';
import { ModifierprojetComponent } from 'src/app/pages/gesuindesprojets/modifierprojet/modifierprojet.component';
import { GestionDesCompetenceComponent } from 'src/app/pages/gestion-des-competence/gestion-des-competence.component';
import { ModifiertacheComponent } from 'src/app/pages/gestiontache/modifiertache/modifiertache.component';
import { CalendarComponent } from 'src/app/calendar/calendar.component';
import { TaskComponent } from 'src/app/pages/gestiontache/task/task.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'update-profile/:id',           component: UpdateProfileComponent},
    { path: 'update-user/:id',           component: ModifierUserComponent },
    { path: 'user-management',           component: GestiondesutilisateurComponent },
    { path: 'user-management/ajouter-utilisateur',           component: AjouterUtilisateurComponent },
    { path: 'projets-management',           component: GesuindesprojetsComponent },
    { path: 'projets-management/ajouter-projet',           component: AjouterprojetComponent },
    { path: 'projets-management/update-projet/:id',           component: ModifierprojetComponent },
    { path: 'competence-management',           component: GestionDesCompetenceComponent },
    { path: 'tache-management/update-tache/:id',           component: ModifiertacheComponent},
    { path: 'calendrier',           component: CalendarComponent},
    { path: 'task',           component: TaskComponent},
];
