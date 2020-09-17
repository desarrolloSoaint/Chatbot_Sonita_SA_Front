import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrivateComponent } from './edit-private.component';

describe('EditPrivateComponent', () => {
  let component: EditPrivateComponent;
  let fixture: ComponentFixture<EditPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
