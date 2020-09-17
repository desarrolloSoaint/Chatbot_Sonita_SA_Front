import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeeneroEditComponent } from './geenero-edit.component';

describe('GeeneroEditComponent', () => {
  let component: GeeneroEditComponent;
  let fixture: ComponentFixture<GeeneroEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeeneroEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeeneroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
