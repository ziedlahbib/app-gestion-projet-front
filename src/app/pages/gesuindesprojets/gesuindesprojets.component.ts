import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Projet } from 'src/app/model/Projet';
import { ProjetServiceService } from 'src/app/service/projet-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gesuindesprojets',
  templateUrl: './gesuindesprojets.component.html',
  styleUrls: ['./gesuindesprojets.component.scss']
})
export class GesuindesprojetsComponent implements OnInit {
  projets:Projet[];
  initialRating: number = 5
  constructor(private ps:ProjetServiceService,private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getuprojets();
  }
  getuprojets(){
    this.ps.getprojets().subscribe(
      data=>{
        console.log(data)
        this.projets=data;
      }
    )
  }
  suprimer(projet:any){
    this.ps.deleteprojet(projet.id).subscribe(
      res=>{
        console.log(res)
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
  
}
