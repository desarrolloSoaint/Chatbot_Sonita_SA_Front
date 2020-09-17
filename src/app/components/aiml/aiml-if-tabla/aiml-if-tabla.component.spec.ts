import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimlIfTablaComponent } from './aiml-if-tabla.component';

describe('AimlIfTablaComponent', () => {
  let component: AimlIfTablaComponent;
  let fixture: ComponentFixture<AimlIfTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimlIfTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimlIfTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
