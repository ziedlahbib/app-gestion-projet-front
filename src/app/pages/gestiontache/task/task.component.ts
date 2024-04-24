import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { jwtDecode } from "jwt-decode";
import { UserServiceService } from 'src/app/service/user-service.service';
import { TacheserviceService } from 'src/app/service/tacheservice.service';
import { Tache } from 'src/app/model/tache';
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

  constructor(private us: UserServiceService, private ts: TacheserviceService) { }

  ngOnInit(): void {
    this.getuserbyid();
  }
  getuserbyid() {
    let token = localStorage.getItem('autorisation' || '');
    let user: any = jwtDecode(token || '');
    this.us.getuserById(user.jti).subscribe(
      data => {
        console.log(data);
        this.user = data;
        this.gettachebuuserid(data.id);
        this.isReady = true;
      }
    )
  }
  gettachebuuserid(userId: Number) {
    this.ts.gettachebyuserId(userId).subscribe(
      data => {
        console.log(data);
        this.tasks = data;
        for (let task of data) {
          this.affichetachedetail(task.id.tacheId);
        }

      }
    )
  }
  affichetachedetail(tacheid: Number) {
    this.ts.gettachebyId(tacheid).subscribe(
      res => {

        this.taches.push(res);
        console.log("tache", this.taches)
      }
    )
  }
}
