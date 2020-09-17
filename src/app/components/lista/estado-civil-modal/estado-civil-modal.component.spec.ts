import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCivilModalComponent } from './estado-civil-modal.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

describe('EstadoCivilModalComponent', () => {
  let component: EstadoCivilModalComponent;
  let fixture: ComponentFixture<EstadoCivilModalComponent>;
  const mockDialogRef = {
    close: jasmine.createSpy('close')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder,HttpClient,HttpHandler,  { 
        provide: MatDialogRef, useValue: mockDialogRef 
       } ],

      declarations: [ EstadoCivilModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadoCivilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
