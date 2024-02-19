import { Component, OnInit } from '@angular/core';
import { ERole } from 'src/app/model/erole';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { technologies } from 'src/app/model/technologies';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Router } from '@angular/router';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-ajouter-utilisateur',
  templateUrl: './ajouter-utilisateur.component.html',
  styleUrls: ['./ajouter-utilisateur.component.scss']
})
export class AjouterUtilisateurComponent implements OnInit {
  public userform!: FormGroup;
  user: User;
  erole=ERole;
  tech=technologies;
  constructor(private us: UserServiceService,private formBuilder: FormBuilder, private route: Router,
    private toastrService: ToastrService
    ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.userform = this.formBuilder.group({
      username: ['', [Validators.required],[this.usernameValidator]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required,Validators.email],[this.emailValidator]],
      role: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      competence: ['', Validators.required],
      lvl: ['', Validators.required],
    
    }, {
      validator: this.ConfirmedValidator('password', 'confirmPassword')
    });


    this.userform.valueChanges.subscribe(
      data => {
        console.log(this.userform?.value);
        
      }
    )

    
  }
  usernameValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;
    console.log('Username validator called');
  
    if (!username) {
      // Return early if the username is empty
      return of(null);
    }
  
    // Use debounceTime to delay the request to avoid making too many requests
    return of(username).pipe(
      debounceTime(300), // Adjust debounce time as needed
      switchMap(username => {
        return this.us.existuserByusername(username).pipe(
          map(response => {
            return response ? { usernameTaken: true } : null;
          }),
          catchError(() => of(null)) // Handle errors gracefully, return null for non-HTTP errors
        );
      })
    );
  };
  emailValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;
  
    if (!username) {
      // Return early if the username is empty
      return of(null);
    }
  
    // Use debounceTime to delay the request to avoid making too many requests
    return of(username).pipe(
      debounceTime(300), // Adjust debounce time as needed
      switchMap(username => {
        return this.us.existuserByemail(username).pipe(
          map(response => {
            return response ? { emailTaken: true } : null;
          }),
          catchError(() => of(null)) // Handle errors gracefully, return null for non-HTTP errors
        );
      })
    );
  };
  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
ajouter() {

  this.us.ajounormaltuser(this.userform.value).subscribe(
    data => {
      console.log(data)
      this.toastrService.success(data.message)
      this.route.navigate(['/user-management']);

    }
  )
}
}
