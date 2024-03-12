import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrModule } from 'ngx-toastr';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { GestiondesutilisateurComponent } from 'src/app/pages/gestiondesutilisateur/gestiondesutilisateur.component';
import { StarRatingComponent } from 'src/app/star-rating/star-rating.component';
import { RangePipe } from 'src/app/range.pipe';
import { AjouterUtilisateurComponent } from 'src/app/pages/gestiondesutilisateur/ajouter-utilisateur/ajouter-utilisateur.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ModifierUserComponent } from 'src/app/pages/gestiondesutilisateur/modifier-user/modifier-user.component';
import { UpdateProfileComponent } from 'src/app/pages/gestiondesutilisateur/update-profile/update-profile.component';
import { ForgotpasswordComponent } from 'src/app/pages/PassowrdMangement/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from 'src/app/pages/PassowrdMangement/resetpassword/resetpassword.component';
import { GesuindesprojetsComponent } from 'src/app/pages/gesuindesprojets/gesuindesprojets.component';
import { AjouterprojetComponent } from 'src/app/pages/gesuindesprojets/ajouterprojet/ajouterprojet.component';
import { ModifierprojetComponent } from 'src/app/pages/gesuindesprojets/modifierprojet/modifierprojet.component';
import { GestionDesCompetenceComponent } from 'src/app/pages/gestion-des-competence/gestion-des-competence.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    MatPaginatorModule,MatFormFieldModule, MatSelectModule, MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    
 

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    GestiondesutilisateurComponent,
    StarRatingComponent,
    RangePipe ,
    AjouterUtilisateurComponent,
    ModifierUserComponent,
    UpdateProfileComponent,
    GesuindesprojetsComponent,
    AjouterprojetComponent,
    ModifierprojetComponent,
    GestionDesCompetenceComponent,


  ]
})

export class AdminLayoutModule {}
