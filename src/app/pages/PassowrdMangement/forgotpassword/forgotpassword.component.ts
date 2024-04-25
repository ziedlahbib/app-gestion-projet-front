import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  spinn:boolean=false;
  public form!: FormGroup;
  mr:boolean=false;
  constructor(private formBuilder: FormBuilder,private router:Router,private us :UserServiceService
    ,private toastrService: ToastrService) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({

      email: ['', [Validators.required,Validators.email]],

    });
    this.form.valueChanges.subscribe(
      data => {
        
        
      }
    )
    }
    send(){
      const controlName = 'email';
      const controlValue = this.form.controls[controlName].value;
      this.spinn=true;
      this.us.forgotPassword(controlValue).subscribe(
        data=>{
   
         
          this.toastrService.success(data.message)
          this.router.navigate(['/login'])
          this.mr=true;
        }
      )
    }

}
