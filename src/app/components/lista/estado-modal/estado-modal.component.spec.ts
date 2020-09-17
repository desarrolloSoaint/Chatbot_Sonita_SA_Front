import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoModalComponent } from './estado-modal.component';

describe('EstadoModalComponent', () => {
  let component: EstadoModalComponent;
  let fixture: ComponentFixture<EstadoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
