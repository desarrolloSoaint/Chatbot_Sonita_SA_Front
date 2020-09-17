import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AimlPostComponent } from './aiml-post.component';

describe('AimlPostComponent', () => {
  let component: AimlPostComponent;
  let fixture: ComponentFixture<AimlPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AimlPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AimlPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
