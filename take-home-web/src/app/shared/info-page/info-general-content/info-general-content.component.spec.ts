import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InfoGeneralContentComponent} from './info-general-content.component';

describe('InfoGeneralContentComponent', () => {
  let component: InfoGeneralContentComponent;
  let fixture: ComponentFixture<InfoGeneralContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoGeneralContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoGeneralContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
