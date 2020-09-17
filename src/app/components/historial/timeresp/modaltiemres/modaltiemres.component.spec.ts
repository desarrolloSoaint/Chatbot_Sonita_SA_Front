import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaltiemresComponent } from './modaltiemres.component';

describe('ModaltiemresComponent', () => {
  let component: ModaltiemresComponent;
  let fixture: ComponentFixture<ModaltiemresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaltiemresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaltiemresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
