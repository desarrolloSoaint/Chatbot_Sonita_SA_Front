import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCivilEditComponent } from './estado-civil-edit.component';
import { FormBuilder } from '@angular/forms';
import { ContactService } from 'app/services/contact.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

describe('EstadoCivilEditComponent', () => {
  let component: EstadoCivilEditComponent;
  let fixture: ComponentFixture<EstadoCivilEditComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder,HttpClient,HttpHandler,{ 
        provide: MatDialogRef, useValue: mockDialogRef 
       }],

      declarations: [ EstadoCivilEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCivilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
