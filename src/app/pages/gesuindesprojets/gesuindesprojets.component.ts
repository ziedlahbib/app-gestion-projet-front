import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/model/Projet';
import { ProjetServiceService } from 'src/app/service/projet-service.service';
import { DatePipe } from '@angular/common';
import { jwtDecode } from "jwt-decode";
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';
@Component({
  selector: 'app-gesuindesprojets',
  templateUrl: './gesuindesprojets.component.html',
  styleUrls: ['./gesuindesprojets.component.scss']
})
export class GesuindesprojetsComponent implements OnInit {
  projets:Projet[];
  initialRating: number = 5
  u:User;
  isReady:boolean=false;
  constructor(private ps:ProjetServiceService,private toastrService: ToastrService,private us:UserServiceService) { }

  ngOnInit(): void {
    let token = localStorage.getItem('autorisation' || '');
    let user: any = jwtDecode(token || '');
    this.us.getuserById(user.jti).subscribe(
      data => {

        this.u = data;
        this.isReady = true;
        this.getuprojets(); // Call the method here after user data is retrieved
      }
    );
  }
  
  getuprojets(){
    if(this.isChefProjet()){
          this.ps.getprojetsbycdp(this.u.id).subscribe(
            data=>{

              this.projets=data;
            }
          )
    }
    else if(this.isResponsable()||this.isSuperadmin()){
      this.ps.getprojets().subscribe(
        data=>{
          
          this.projets=data;
        }
      )
    }
    else if(this.isDeveloppeur()){
      this.ps.getprojetsbydev(this.u.id).subscribe(
        data=>{
          
          this.projets=data;
        }
      )
    }

  }
  suprimer(projet:any){
    this.ps.deleteprojet(projet.id).subscribe(
      res=>{

        this.toastrService.success(res.message)
        this.ps.getprojets().subscribe(
          data=>{
            this.projets=data;
          }
        )
      }
    )
  }
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const datePipe = new DatePipe('en-US'); // Change 'en-US' to your desired locale
    return datePipe.transform(formattedDate, 'yyyy-MM-dd'); // Adjust the format as needed
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
