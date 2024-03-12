import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesCompetenceComponent } from './gestion-des-competence.component';

describe('GestionDesCompetenceComponent', () => {
  let component: GestionDesCompetenceComponent;
  let fixture: ComponentFixture<GestionDesCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDesCompetenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDesCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
