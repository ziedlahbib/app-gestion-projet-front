import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { ERole } from 'src/app/model/erole';
import { FileDB } from 'src/app/model/fileDB';
import { technologies } from 'src/app/model/technologies';
import { User } from 'src/app/model/user';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  user: User;
  erole = ERole;
  tech = technologies;
  isReady: boolean = false;
  public userform!: FormGroup;
  selectedFiles: FileList;
  currentFile: any;
  file: FileDB;
  constructor(private formBuilder: FormBuilder, private route: Router,
    private router: ActivatedRoute, private us: UserServiceService, private toastrService: ToastrService,
    private authenticationService: AuthServiceService) { }

  ngOnInit(): void {
    this.get(this.router.snapshot.params['id'])
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
      username: [data?.username, [Validators.required], [this.usernameValidator]],
      nom: [data?.nom, Validators.required],
      prenom: [data?.prenom, Validators.required],
      email: [data?.email, [Validators.required, Validators.email], [this.emailValidator]],
      role: [data?.roles?.name],

    });


    this.userform.valueChanges.subscribe(
      data => {



      }
    )


  }
  get(id: number) {
    this.us.getuserById(id).subscribe(
      data => {

        this.user = data;

        this.isReady = true;
        this.initForm(data);


      }
    );
  }
  modifier() {
    this.us.modifierprofile(this.router.snapshot.params['id'], this.userform.value).subscribe(
      data => {

        this.us.setNom(data.user.nom);
        this.us.setPrenom(data.user.prenom);
        console.log(this.userform.get('username').value)
        console.log(this.user.username)
        if(this.userform.get('username').value!=this.user.username){
          this.toastrService.success("identifiant a changé changer !!reconnecter avec le nouveau identifiant");
          this.logout()
        }
        this.toastrService.success(data.message)
        
      }
    )
  }
  logout() {
    this.authenticationService.logout();
  }
  // In your component class
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
  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload(): FileDB {
    this.currentFile = this.selectedFiles.item(0);
    console.log(this.selectedFiles)
    console.log(this.currentFile)
    this.us.upload(this.currentFile).subscribe(

      event => {

        console.log("file", event)

        this.us.getFilesdetail(event).subscribe(
          data => {
            this.file = data;
            console.log('file', this.file)
            this.us.affecterfileauuser(this.router.snapshot.params['id'],data.id,this.user).subscribe(
              res=>{
                console.log(res)
                this.us.setID(data.id.toString())
              }
            )

          }
        );


      }
    );
    return this.file;
  }
}
