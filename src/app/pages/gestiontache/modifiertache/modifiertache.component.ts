import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { Projet } from 'src/app/model/Projet';
import { RecommendationResponse } from 'src/app/model/RecommendationResponse ';
import { Competence } from 'src/app/model/competence';
import { Tache } from 'src/app/model/tache';
import { User } from 'src/app/model/user';
import { UserWithSortedCompetences } from 'src/app/model/userWithSortedCompetences';
import { CompetenceService } from 'src/app/service/competence.service';
import { ProjetServiceService } from 'src/app/service/projet-service.service';
import { TacheserviceService } from 'src/app/service/tacheservice.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-modifiertache',
  templateUrl: './modifiertache.component.html',
  styleUrls: ['./modifiertache.component.scss']
})
export class ModifiertacheComponent implements OnInit {
  public tacheform!: FormGroup;
  public compform!: FormGroup;
  isReady:boolean=false;
  tache:Tache;
  competencelist:Competence[];
  users:User[]= [];
  recomendedusers:User[]= [];
  userstache:User[]= [];
  userRating: number = 0;
  userRatingsMap: Map<Number, Observable<Number>> = new Map<Number, Observable<Number>>();
  starRating = 0; 
  taches: Tache[]=[];
  tachesr: Tache[]=[];
  tasks: any[];
  projet:Projet[]=[];
  projetr:Projet[]=[];
  isReadyru:boolean=false;
  constructor(private formBuilder: FormBuilder, private route: Router,
    private router:ActivatedRoute,private toastrService: ToastrService,
    private ts:TacheserviceService,private cs :CompetenceService,private us:UserServiceService,private ps:ProjetServiceService) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      const id = Number(params.get('id')); // Convert string to number
      if (id) {
        this.get(id);
      }
    });
    this.initcompForm();
    this.getcompetences();
    this.getusers();
    this.getusersbytache();



  }
  getusers() {
    this.us.getusers().subscribe(
      data => {
        
        for(let u of data){
          if(u.roles.name=="ROLE_DEVELOPPEUR"){
            this.users.push(u)
          }
        }
        // this.users = data;
        console.log(this.users);
        // Initialize taches and projet lists with null values
        this.taches = new Array(this.users.length).fill(null);
        this.projet = new Array(this.users.length).fill(null);
  
        for (let i = 0; i < this.users.length; i++) {
          const u = this.users[i];
          if (u.status === 'non disponible') {
            this.gettachebuuserid(u.id, i); // Pass index i to gettachebuuserid function
          } else if (u.status == null || u.status === 'disponible') {
            this.taches[i] = null;
            this.projet[i] = null;
          }
        }
        this.fetchUserRatings();
      }
    );
  }
  
  gettachebuuserid(userId: Number, index: number) { // Add index parameter
    this.ts.gettachebyuserId(userId).subscribe(
      data => {
        this.tasks = data;
        for (let task of data) {
          if (task.status === 'en cours') {
            this.affichetachedetail(task.id.tacheId, index); // Pass index to affichetachedetail function
            console.log(task);
            this.getprojetbytacheid(task.id.tacheId, index); // Pass index to getprojetbytacheid function
          }
        }
        console.log(this.projet);
        console.log(this.taches);
      }
    );
  }
  
  
  getprojetbytacheid(tacheid: number, index: number) { // Add index parameter
    this.ps.getprojettachebyid(tacheid).subscribe(
      projet => {
        this.projet[index] = projet; 
        this.projetr[index] = projet; // Assign the project to the correct index
      }
    );
  }
  
  affichetachedetail(tacheid: number, index: number) { // Add index parameter
    this.ts.gettachebyId(tacheid).subscribe(
      res => {
        this.taches[index] = res; 
        this.tachesr[index] = res;// Assign the task to the correct index
      }
    );
  }
  
  getusersbytache(){

    this.us.getuserBytache(this.router.snapshot.params['id']).subscribe(
      data=>{

        this.userstache=data;
        this.fetchUserRatings();
      }
    )
  }
  todotachdev(idu:Number){
    this.ts.todotachedev(idu,this.router.snapshot.params['id'],this.tache).subscribe(
      res=>{
      
        this.getusers();
        this.getusersbytache();
      }
    )
  }
  afectertachdev(idu:Number){
    this.ts.affectertachedev(idu,this.router.snapshot.params['id'],this.tache).subscribe(
      res=>{
  
        this.getusers();
        this.getusersbytache();
      }
    )
  }
  desafectertachdev(idu:Number){
    this.ts.desaffectertachedev(idu,this.router.snapshot.params['id'],this.tache).subscribe(
      res=>{

        this.getusers();
        this.getusersbytache();
      }
    )
  }
  // getrecomendtask(): void {
  //   this.ts.getrecomendtask(this.router.snapshot.params['id']).subscribe(
  //     data => {
  //       console.log(data.Tasks);
  //       for (let t of data.Tasks) {
  //         this.us.getuserBytacheall(t).subscribe(
  //           res => {
              
  //             // Check if the user already exists in the recomendedusers array before pushing
  //             res.forEach(user => {
  //               if (!this.recomendedusers.some(u => u.id === user.id)) {
  //                 this.recomendedusers.push(user);
  //                 console.log(user)
  //                 this.fetchUserRatings();
  //               }
  //             });
  //             console.log(res);
  //             this.isReadyru=true;
  //             this.tachesr = new Array(this.recomendedusers.length).fill(null);
  //             this.projetr = new Array(this.recomendedusers.length).fill(null);
        
  //             for (let i = 0; i < this.recomendedusers.length; i++) {
  //               const u = this.recomendedusers[i];
  //               if (u.status === 'non disponible') {
  //                 this.gettachebuuserid(u.id, i); // Pass index i to gettachebuuserid function
  //               } else if (u.status == null || u.status === 'disponible') {
  //                 this.tachesr[i] = null;
  //                 this.projetr[i] = null;
  //               }
  //             }
  //             this.recomendedusers.sort((a, b) => b.rating - a.rating);
  //           },
  //           error => {
  //             console.error('Error fetching user by tache:', error);
  //           }
  //         );
          
  //       }
  //     },
  //     error => {
  //       console.error('Error fetching recommendations:', error);
  //     }
  //   );
  // }
 
  
  getrecomendtask(): void {
    const taskId = this.router.snapshot.params['id'];
    this.ts.getrecomendtask(taskId).subscribe(
      (data: any) => {
        const userRequests = data.RecommendedUsers.map(user => this.us.getuserById(user.id));
        forkJoin(userRequests).subscribe(
          (responses: any[]) => {
            console.log('User Responses:', responses);
            // Filter users based on the role name 'ROLE_DEVELOPPEUR'
            this.recomendedusers = responses.filter(user => user.roles && user.roles.name === 'ROLE_DEVELOPPEUR');
            // console.log('Filtered User Responses:', filteredUsers);
            
        
            console.log('Sorted User Responses:', this.recomendedusers);
            this.isReadyru = true;
          },
          error => {
            console.error('Error fetching users:', error);
          }
        );
      },
      error => {
        console.error('Error fetching recommendations', error);
      }
    );
  }
  
  
  
  
  get(id:number){
    this.ts.gettachebyId(id).subscribe(
      data => {
        this.tache = data;
   ;
        this.isReady=true;
        this.initForm(data);
      }
    );
  }
  initForm(data) {
    this.tacheform = this.formBuilder.group({
      description: [data?.description, [Validators.required]],
      date_debut: [this.formatDate(data?.date_debut), Validators.required],
      date_fin: [this.formatDate(data?.date_fin), Validators.required],
    });
    this.tacheform.valueChanges.subscribe(
      data => {

      }
    ) 
  }
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const datePipe = new DatePipe('en-US'); // Change 'en-US' to your desired locale
    return datePipe.transform(formattedDate, 'yyyy-MM-dd'); // Adjust the format as needed
  }
  onRatingChange(rating: number,idu:number) {
    // Handle the rating change here, for example, you can update a property like userRating
    this.userRating = rating;

    this.ts.rate(rating,this.router.snapshot.params['id'],idu).subscribe(
      res=>{

      }
    )
  }
  fetchUserRatings(): void {
    this.users.forEach(user => {

      this.ts.gettacheuserrateId(this.tache.id, user.id).subscribe(rate => {
        this.userRatingsMap.set(user.id, of(rate)); // Assuming rate is a number

      });
    });
  }
  
  initcompForm() {
    this.compform = this.formBuilder.group({
      selectedCompetenceId: [''],
      lvl: [''],
    
    });

    this.compform.valueChanges.subscribe(
      data => {


        
      }
    )
  }
  getcompetences(){
    this.cs.getcompetences().subscribe(
      res=>{
        this.competencelist=res;
      }
    )
  }
  affectercomptache() {
    const tacheid = this.router.snapshot.params['id'];
    const formData = this.compform.value;
    this.ts.affectercomptache(tacheid, formData.selectedCompetenceId, this.tache).subscribe(
      data => {
   ;
        this.get(this.router.snapshot.params['id']);

      }
    );
  }
  desaffectercomptache(comp:any) {
    const tacheid = this.router.snapshot.params['id']
    this.ts.desaffectercomptache(tacheid, comp.id, this.tache).subscribe(
      data => {
   ;
        this.get(this.router.snapshot.params['id']);
      }
    );
  }
  modifier(){
    this.ts.updatetache(this.router.snapshot.params['id'],this.tacheform.value).subscribe(
      data=>{
   ;
        this.toastrService.success("modifier avec succés");
        this.get(this.router.snapshot.params['id']);

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
  isChefProjet(): boolean {
    let role = localStorage.getItem('role' || '');
    return role == "ROLE_CHEF_DE_PROJET";
  }
  isDeveloppeur(): boolean {
    let role = localStorage.getItem('role' || '');
    return role == "ROLE_DEVELOPPEUR";
  }
}
