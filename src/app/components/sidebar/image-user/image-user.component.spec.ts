import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUserComponent } from './image-user.component';

describe('ImageUserComponent', () => {
  let component: ImageUserComponent;
  let fixture: ComponentFixture<ImageUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
