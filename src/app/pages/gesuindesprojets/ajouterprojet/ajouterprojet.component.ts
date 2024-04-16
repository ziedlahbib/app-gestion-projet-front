import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/model/Projet';
import { User } from 'src/app/model/user';
import { ProjetServiceService } from 'src/app/service/projet-service.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { jwtDecode } from "jwt-decode";


@Component({
  selector: 'app-ajouterprojet',
  templateUrl: './ajouterprojet.component.html',
  styleUrls: ['./ajouterprojet.component.scss']
})
export class AjouterprojetComponent implements OnInit {
  public projetform!: FormGroup;
  Cdp:User[];
  projet:Projet;
  u:User;
  isReady:boolean=false;
  public cdpform!: FormGroup;
  constructor(private ps: ProjetServiceService,private formBuilder: FormBuilder, private route: Router,
    private toastrService: ToastrService,private us:UserServiceService) { }

  ngOnInit(): void {
    this.initForm();
    this.getcdp();
    this.initformcdp();
    this.getuserbyid();
  }
  initForm() {
    this.projetform = this.formBuilder.group({
      nom_projet: ['', [Validators.required]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      color:['', Validators.required]

    
    });
    this.projetform.valueChanges.subscribe(
      data => {
        console.log(this.projetform?.value);
        
      }
    )
  }
  initformcdp(){
    this.cdpform = this.formBuilder.group({
      selectedCdpId: ['', [Validators.required]],
    });
    this.cdpform.valueChanges.subscribe(
      data => {
        console.log(this.cdpform?.value);
      }
    )
    
  }
  ajouter() {
    // const formattedDate = this.formatDate(this.projetform.value.date_limite);

    // // Create a new object with the formatted date
    // const formData = {
    //   ...this.projetform.value,
    //   date_limite: formattedDate
    // };
    this.ps.ajoutprojet(this.projetform.value).subscribe(
      data => {
        console.log(data)
        const projetId = data.id;
        if(this.isResponsable()||this.isSuperadmin()){
          const userId = this.cdpform.value.selectedCdpId;
          this.ps.affecterprojetcdp(userId,projetId,data).subscribe(
            res=>{
              this.toastrService.success("projet ajouté avec succés")
              this.route.navigate(['/projets-management']);
              
            }
          )
        }else if(this.isChefProjet()){
          this.ps.affecterprojetcdp(this.u.id,projetId,data).subscribe(
            res=>{
              this.toastrService.success("projet ajouté avec succés")
              this.route.navigate(['/projets-management']);
              
            }
          )
          this.toastrService.success("projet ajouté avec succés")
          this.route.navigate(['/projets-management']);
        }
      }
    )
  }
  getcdp(){
    this.us.getcdp().subscribe(
      data=>{
        this.Cdp=data;
        console.log(data)
      }
    )
  }
  getuserbyid() {
    let token = localStorage.getItem('autorisation' || '');
    let user: any = jwtDecode(token || '');
    this.us.getuserById(user.jti).subscribe(
      data => {
        console.log(data);
        this.u=data;
        this.isReady = true;
      }
    )
  }
  isSuperadmin():boolean{
    let role = localStorage.getItem('role' || '');
    return role=="ROLE_SUPERADMIN";
  }
  isChefProjet():boolean{
    let role = localStorage.getItem('role' || '');
    return role=="ROLE_CHEF_DE_PROJET";
  }
  isResponsable():boolean{
    let role = localStorage.getItem('role' || '');
    return role=="ROLE_RESPONSABLE";
  }
  isDeveloppeur():boolean{
    let role = localStorage.getItem('role' || '');
    return role=="ROLE_DEVELOPPEUR";
  }
}
