import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePublicoComponent } from './cliente-publico.component';

describe('ClientePublicoComponent', () => {
  let component: ClientePublicoComponent;
  let fixture: ComponentFixture<ClientePublicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientePublicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
