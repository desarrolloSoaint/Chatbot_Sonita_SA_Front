import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimlIfPostComponent } from './aiml-if-post.component';

describe('AimlIfPostComponent', () => {
  let component: AimlIfPostComponent;
  let fixture: ComponentFixture<AimlIfPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimlIfPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimlIfPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
