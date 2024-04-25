import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { jwtDecode } from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';
import { TacheserviceService } from 'src/app/service/tacheservice.service';
import { Tache } from 'src/app/model/tache';
import { ProjetServiceService } from 'src/app/service/projet-service.service';
import { Projet } from 'src/app/model/Projet';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  isReady: boolean = false;
  user: User;
  taches: Tache[]=[];
  tasks: any[];
  projet:Projet[]=[]

  constructor(private us: UserServiceService, private ts: TacheserviceService,private ps:ProjetServiceService) { }

  ngOnInit(): void {
    this.getuserbyid();
  }
  getuserbyid() {
    let token = localStorage.getItem('autorisation' || '');
    let user: any = jwtDecode(token || '');
    this.us.getuserById(user.jti).subscribe(
      data => {
   
        this.user = data;
        this.gettachebuuserid(data.id);
        this.isReady = true;
      }
    )
  }
  gettachebuuserid(userId: Number) {
    this.ts.gettachebyuserId(userId).subscribe(
      data => {
   
        this.tasks = data;
        for (let task of data) {
          this.affichetachedetail(task.id.tacheId);
          this.getprojetbytacheid(task.id.tacheId);
        }

      }
    )
  }
  getprojetbytacheid(tacheid:Number){
    this.ps.getprojettachebyid(tacheid).subscribe(
      tache=>{

        this.projet.push(tache);
      }
    )
  }
  affichetachedetail(tacheid: Number) {
    this.ts.gettachebyId(tacheid).subscribe(
      res => {

        this.taches.push(res);

      }
    )
  }
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const datePipe = new DatePipe('en-US'); // Change 'en-US' to your desired locale
    return datePipe.transform(formattedDate, 'yyyy-MM-dd'); // Adjust the format as needed
  }
}
