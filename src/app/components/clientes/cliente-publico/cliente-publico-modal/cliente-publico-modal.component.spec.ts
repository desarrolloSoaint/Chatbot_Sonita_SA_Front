import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePublicoModalComponent } from './cliente-publico-modal.component';

describe('ClientePublicoModalComponent', () => {
  let component: ClientePublicoModalComponent;
  let fixture: ComponentFixture<ClientePublicoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientePublicoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePublicoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
