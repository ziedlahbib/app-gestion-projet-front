import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { Competence } from 'src/app/model/competence';
import { ERole } from 'src/app/model/erole';
import { technologies } from 'src/app/model/technologies';
import { User } from 'src/app/model/user';
import { CompetenceService } from 'src/app/service/competence.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.scss']
})
export class ModifierUserComponent implements OnInit {
  user:User;
  erole=ERole;
  tech=technologies;
  competencelist:Competence[];
  isReady:boolean=false;
  public userform!: FormGroup;
  public compform!: FormGroup;
  constructor( private formBuilder: FormBuilder, private route: Router,
    private router:ActivatedRoute,private us:UserServiceService,private toastrService: ToastrService,
    private cs :CompetenceService) { }

    ngOnInit(): void {
      this.get(this.router.snapshot.params['id'])
      this.getcompetences();
      this.initcompForm()

    }
    initcompForm() {
      this.compform = this.formBuilder.group({
        selectedCompetenceId: [''],
        lvl: [''],
      
      });
  
      this.compform.valueChanges.subscribe(
        data => {
          console.log(this.compform?.value);

          
        }
      )
  
      
    }
    affectercompuser() {
      const userId = this.router.snapshot.params['id'];
      const formData = this.compform.value;
      this.cs.affectercompuser(userId, formData.selectedCompetenceId, formData).subscribe(
        data => {
          console.log(data);
          this.get(userId);
        }
      );
    }
    desaffectercompuser(comp:any) {
      const userId = this.router.snapshot.params['id']
      this.cs.desaffectercompuser(userId, comp.competence.id, comp).subscribe(
        data => {
          console.log(data);
          this.get(userId);
        }
      );
    }
    getcompetences(){
      this.cs.getcompetences().subscribe(
        res=>{
          this.competencelist=res;
        }
      )
    }
    usernameValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
      const username = control.value;
    
      if (!username) {
        // Return early if the username is empty
        return of(null);
      }
    
      // Retrieve the current username being edited
      const currentUsername = this.user.username;
    
      // If the current username is the same as the new username, return early with no errors
      if (username === currentUsername) {
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
      const email = control.value;
    
      if (!email) {
        // Return early if the email is empty
        return of(null);
      }
    
      // Retrieve the current email being edited
      const currentEmail = this.user.email; 
    
      // If the current email is the same as the new email, return early with no errors
      if (email === currentEmail) {
        return of(null);
      }
    
      // Use debounceTime to delay the request to avoid making too many requests
      return of(email).pipe(
        debounceTime(300), // Adjust debounce time as needed
        switchMap(email => {
          return this.us.existuserByemail(email).pipe(
            map(response => {
              return response ? { emailTaken: true } : null;
            }),
            catchError(() => of(null)) // Handle errors gracefully, return null for non-HTTP errors
          );
        })
      );
    };
    
    initForm(data) {
      this.userform = this.formBuilder.group({
        username: [data?.username, [Validators.required],[this.usernameValidator]],
        nom: [data?.nom, Validators.required],
        prenom: [data?.prenom, Validators.required],
        email: [data?.email, [Validators.required,Validators.email],[this.emailValidator]],
        role: [data?.roles.name],
      
      });
  
  
      this.userform.valueChanges.subscribe(
        data => {
          console.log(this.userform?.value);
          
          
        }
      )
  
      
    }
    get(id:number){
      this.us.getuserById(id ).subscribe(
        data => {
    
          this.user = data;
          console.log(data);
          this.isReady=true;
          this.initForm(data);
  
    
        }
      );
    }
    modifier(){
      this.us.modifieruser(this.router.snapshot.params['id'],this.userform.value).subscribe(
        data=>{
          console.log(data);
          this.toastrService.success(data.message)
          this.route.navigate(['/user-management']);
        }
      )
    }
    getFormattedRole(role: string): string {
      if (role.startsWith('ROLE_')) {
        const formattedRole = role.replace('ROLE_', '');
        const words = formattedRole.split('_');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
        return capitalizedWords.join(' ');
      } else {
        return role; // If the role doesn't start with "ROLE_", return it as is
      }
    }
}
