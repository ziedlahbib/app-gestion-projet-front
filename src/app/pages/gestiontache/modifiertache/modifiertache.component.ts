import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, of } from 'rxjs';
import { Projet } from 'src/app/model/Projet';
import { Competence } from 'src/app/model/competence';
import { Tache } from 'src/app/model/tache';
import { User } from 'src/app/model/user';
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
  userstache:User[]= [];
  userRating: number = 0;
  userRatingsMap: Map<Number, Observable<Number>> = new Map<Number, Observable<Number>>();
  starRating = 0; 
  taches: Tache[]=[];
  tasks: any[];
  projet:Projet[]=[];
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
        console.log(data);
        this.users = data;
  
        // Initialize taches and projet lists with null values
        this.taches = new Array(data.length).fill(null);
        this.projet = new Array(data.length).fill(null);
  
        for (let i = 0; i < data.length; i++) {
          const u = data[i];
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
        this.projet[index] = projet; // Assign the project to the correct index
      }
    );
  }
  
  affichetachedetail(tacheid: number, index: number) { // Add index parameter
    this.ts.gettachebyId(tacheid).subscribe(
      res => {
        this.taches[index] = res; // Assign the task to the correct index
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
  getrecomendtask(){
    this.ts.getrecomendtask(this.router.snapshot.params['id']).subscribe(
      data=>{
        console.log(data);
      }
    )
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
