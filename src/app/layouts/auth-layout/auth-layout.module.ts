import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ForgotpasswordComponent } from 'src/app/pages/PassowrdMangement/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from 'src/app/pages/PassowrdMangement/resetpassword/resetpassword.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule
    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
  ]
})
export class AuthLayoutModule { }
