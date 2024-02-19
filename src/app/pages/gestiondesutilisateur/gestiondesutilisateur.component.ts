import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-gestiondesutilisateur',
  templateUrl: './gestiondesutilisateur.component.html',
  styleUrls: ['./gestiondesutilisateur.component.scss']
})
export class GestiondesutilisateurComponent implements OnInit {

  users:User[];
  initialRating: number = 3
  constructor(private us:UserServiceService,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getusers();
  }
getusers(){
  this.us.getusers().subscribe(
    data=>{
      console.log(data)
      this.users=data;
    }
  )
}
suprimer(user :any){
  this.us.deleteUser(user.id).subscribe(
    res=>{
      console.log(res)
      this.us.getusers().subscribe(
        data=>{
          this.users=data;
          this.toastrService.success(res.message)
        }
      )
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
