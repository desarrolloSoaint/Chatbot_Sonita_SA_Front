import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionuserComponent } from './opcionuser.component';

describe('OpcionuserComponent', () => {
  let component: OpcionuserComponent;
  let fixture: ComponentFixture<OpcionuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcionuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
