import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneroModalComponent } from './genero-modal.component';

describe('GeneroModalComponent', () => {
  let component: GeneroModalComponent;
  let fixture: ComponentFixture<GeneroModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneroModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
