import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Competence } from 'src/app/model/competence';
import { Tache } from 'src/app/model/tache';
import { CompetenceService } from 'src/app/service/competence.service';
import { TacheserviceService } from 'src/app/service/tacheservice.service';

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
  constructor(private formBuilder: FormBuilder, private route: Router,
    private router:ActivatedRoute,private toastrService: ToastrService,
    private ts:TacheserviceService,private cs :CompetenceService) { }

  ngOnInit(): void {
    this.get(this.router.snapshot.params['id']);
    this.initcompForm();
    this.getcompetences()
  }
  get(id:number){
    this.ts.gettachebyId(id).subscribe(
      data => {
        this.tache = data;
        console.log(data);
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
        console.log(this.tacheform?.value);
      }
    ) 
  }
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const datePipe = new DatePipe('en-US'); // Change 'en-US' to your desired locale
    return datePipe.transform(formattedDate, 'yyyy-MM-dd'); // Adjust the format as needed
  }
  initcompForm() {
    this.compform = this.formBuilder.group({
      selectedCompetenceId: [''],
      lvl: [''],
    
    });

    this.compform.valueChanges.subscribe(
      data => {
        console.log(this.compform?.value);

        
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
        console.log(data);
        this.get(this.router.snapshot.params['id']);

      }
    );
  }
  desaffectercomptache(comp:any) {
    const tacheid = this.router.snapshot.params['id']
    this.ts.desaffectercomptache(tacheid, comp.id, this.tache).subscribe(
      data => {
        console.log(data);
        this.get(this.router.snapshot.params['id']);
      }
    );
  }
  modifier(){
    this.ts.updatetache(this.router.snapshot.params['id'],this.tacheform.value).subscribe(
      data=>{
        console.log(data);
        this.toastrService.success("modifier avec succés");
        this.get(this.router.snapshot.params['id']);

      }
    )
  }
}
