import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestiondesutilisateurComponent } from './gestiondesutilisateur.component';

describe('GestiondesutilisateurComponent', () => {
  let component: GestiondesutilisateurComponent;
  let fixture: ComponentFixture<GestiondesutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestiondesutilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestiondesutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
