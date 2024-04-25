import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public userform!: FormGroup;
  user: User;
  constructor(private us: UserServiceService, private formBuilder: FormBuilder, private route: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.userform = this.formBuilder.group({
      username: ['', [Validators.required],[this.usernameValidator]],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required,Validators.email],[this.emailValidator]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    
    }, {
      validator: this.ConfirmedValidator('password', 'confirmPassword')
    });


    this.userform.valueChanges.subscribe(
      data => {
       
        
      }
    )
    this.userform.get('username')?.valueChanges.subscribe((value) => {
      // You can log the value here to see if the function is called
     
    });
    
  }
  usernameValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
    const username = control.value;
   
  
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

    this.us.ajoutuser(this.userform.value).subscribe(
      data => {
        this.user = data;
        this.route.navigate(['/login']);
  
      }
    )
  }

}
