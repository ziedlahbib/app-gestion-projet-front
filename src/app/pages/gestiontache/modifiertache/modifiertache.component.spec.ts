import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiertacheComponent } from './modifiertache.component';

describe('ModifiertacheComponent', () => {
  let component: ModifiertacheComponent;
  let fixture: ComponentFixture<ModifiertacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiertacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiertacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
