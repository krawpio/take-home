import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchComponent} from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent<any>;
  let fixture: ComponentFixture<SearchComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
