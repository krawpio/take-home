import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainMenuElementComponent} from './main-menu-element.component';

describe('MainMenuElementComponent', () => {
  let component: MainMenuElementComponent;
  let fixture: ComponentFixture<MainMenuElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainMenuElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainMenuElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
