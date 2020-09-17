import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SoniatComponent } from './soniat.component';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigService } from 'app/configuration/config.service';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SoniatComponent', () => {
  let component: SoniatComponent;
  let fixture: ComponentFixture<SoniatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpModule,HttpClientTestingModule],
      providers:[FormBuilder,ConfigService,],
      declarations: [ SoniatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoniatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
