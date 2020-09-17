import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionModalComponent } from './profesion-modal.component';

describe('ProfesionModalComponent', () => {
  let component: ProfesionModalComponent;
  let fixture: ComponentFixture<ProfesionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
