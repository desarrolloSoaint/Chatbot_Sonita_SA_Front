import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesionEditComponent } from './profesion-edit.component';

describe('ProfesionEditComponent', () => {
  let component: ProfesionEditComponent;
  let fixture: ComponentFixture<ProfesionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfesionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
