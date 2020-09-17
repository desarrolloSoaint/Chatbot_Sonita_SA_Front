import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaisModalComponent } from './pais-modal.component';

describe('PaisModalComponent', () => {
  let component: PaisModalComponent;
  let fixture: ComponentFixture<PaisModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaisModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaisModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
