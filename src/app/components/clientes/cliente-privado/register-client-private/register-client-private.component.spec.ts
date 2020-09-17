import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClientPrivateComponent } from './register-client-private.component';

describe('RegisterClientPrivateComponent', () => {
  let component: RegisterClientPrivateComponent;
  let fixture: ComponentFixture<RegisterClientPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterClientPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterClientPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
