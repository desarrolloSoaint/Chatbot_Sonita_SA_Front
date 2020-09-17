import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolModalComponent } from './rol-modal.component';

describe('RolModalComponent', () => {
  let component: RolModalComponent;
  let fixture: ComponentFixture<RolModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
