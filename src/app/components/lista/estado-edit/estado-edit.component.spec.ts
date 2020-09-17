import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoEditComponent } from './estado-edit.component';

describe('EstadoEditComponent', () => {
  let component: EstadoEditComponent;
  let fixture: ComponentFixture<EstadoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
