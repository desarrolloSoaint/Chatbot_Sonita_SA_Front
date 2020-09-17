import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimlTablaComponent } from './aiml-tabla.component';

describe('AimlTablaComponent', () => {
  let component: AimlTablaComponent;
  let fixture: ComponentFixture<AimlTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimlTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimlTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
