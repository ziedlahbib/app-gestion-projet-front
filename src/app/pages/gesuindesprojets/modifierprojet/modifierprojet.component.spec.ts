import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierprojetComponent } from './modifierprojet.component';

describe('ModifierprojetComponent', () => {
  let component: ModifierprojetComponent;
  let fixture: ComponentFixture<ModifierprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
