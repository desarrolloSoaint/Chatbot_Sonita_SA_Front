import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoniatPublicoComponent } from './soniat-publico.component';
import { AuthService } from 'app/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SoniatPublicoComponent', () => {
  let component: SoniatPublicoComponent;
  let fixture: ComponentFixture<SoniatPublicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[AuthService],
      declarations: [ SoniatPublicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoniatPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
