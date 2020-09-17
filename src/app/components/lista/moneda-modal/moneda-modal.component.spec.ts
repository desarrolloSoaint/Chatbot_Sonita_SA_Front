import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonedaModalComponent } from './moneda-modal.component';

describe('MonedaModalComponent', () => {
  let component: MonedaModalComponent;
  let fixture: ComponentFixture<MonedaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonedaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonedaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
