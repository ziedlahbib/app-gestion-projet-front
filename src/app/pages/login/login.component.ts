import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm!: FormGroup;
  errorMessage = "Les informations d'identification invalides";
  errordesaMessage = "Ce compte est désactivé";
  successMessage?: string;
  comptedesa=false;
  invalidLogin = false;
  loginSuccess = false
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthServiceService) {}

  ngOnInit() {
    this.initForm();
    
  }
  ngOnDestroy() {
  }
  initForm(){
    this.loginForm = new FormGroup(
      {
        username : new FormControl(),
        password : new FormControl()
      }
    )
  }
  handleLogin() {
    this.authenticationService.authenticationService(this.loginForm.value).subscribe(
      (result) => {
        if (result.message === "Ce compte est désactivé") {
          this.authenticationService.logout();
          this.comptedesa=true
        } else {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
          this.router.navigate(['/calendrier']);
          this.authenticationService.registerSuccessfulLogin(result);
        }
      },
      () => {
        this.invalidLogin = true;
        this.loginSuccess = false;
      }
    );
    this.showAlerts();
  }
  showAlerts(): void {
    setTimeout(() => {
      this.comptedesa = false;
      this.invalidLogin = false;
      this.loginSuccess = false;
    }, 6000);
  }

}
