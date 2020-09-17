import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientePrivadoComponent } from './cliente-privado.component';

describe('ClientePrivadoComponent', () => {
  let component: ClientePrivadoComponent;
  let fixture: ComponentFixture<ClientePrivadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientePrivadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientePrivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
