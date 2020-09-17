import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabladosComponent } from './tablados.component';

describe('TabladosComponent', () => {
  let component: TabladosComponent;
  let fixture: ComponentFixture<TabladosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabladosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabladosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
