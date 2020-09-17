import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimlEditarComponent } from './aiml-editar.component';

describe('AimlEditarComponent', () => {
  let component: AimlEditarComponent;
  let fixture: ComponentFixture<AimlEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimlEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimlEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
