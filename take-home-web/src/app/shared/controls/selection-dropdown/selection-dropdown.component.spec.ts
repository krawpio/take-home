import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectionDropdownComponent} from './selection-dropdown.component';

describe('SelectionDropdownComponent', () => {
  let component: SelectionDropdownComponent;
  let fixture: ComponentFixture<SelectionDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
