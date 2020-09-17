import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePublicoEditarComponent } from './cliente-publico-editar.component';

describe('ClientePublicoEditarComponent', () => {
  let component: ClientePublicoEditarComponent;
  let fixture: ComponentFixture<ClientePublicoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientePublicoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePublicoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
