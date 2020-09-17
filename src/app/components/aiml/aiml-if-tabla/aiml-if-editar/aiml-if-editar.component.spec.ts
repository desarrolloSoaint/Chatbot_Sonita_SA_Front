import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimlIfEditarComponent } from './aiml-if-editar.component';

describe('AimlIfEditarComponent', () => {
  let component: AimlIfEditarComponent;
  let fixture: ComponentFixture<AimlIfEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimlIfEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimlIfEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
