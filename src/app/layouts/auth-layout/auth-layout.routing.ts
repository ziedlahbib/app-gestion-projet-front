import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ForgotpasswordComponent } from 'src/app/pages/PassowrdMangement/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from 'src/app/pages/PassowrdMangement/resetpassword/resetpassword.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'forgotpassword',       component: ForgotpasswordComponent },
    { path: 'reset',       component: ResetpasswordComponent },
];
