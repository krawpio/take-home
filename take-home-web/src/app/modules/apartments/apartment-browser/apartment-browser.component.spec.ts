import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApartmentBrowserComponent} from './apartment-browser.component';

describe('ApartmentBrowserComponent', () => {
  let component: ApartmentBrowserComponent;
  let fixture: ComponentFixture<ApartmentBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentBrowserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
