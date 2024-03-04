import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GesuindesprojetsComponent } from './gesuindesprojets.component';

describe('GesuindesprojetsComponent', () => {
  let component: GesuindesprojetsComponent;
  let fixture: ComponentFixture<GesuindesprojetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GesuindesprojetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GesuindesprojetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
