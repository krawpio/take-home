import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApartmentMiniSearchComponent} from './apartment-mini-search.component';

describe('ApartmentMiniSearchComponent', () => {
  let component: ApartmentMiniSearchComponent;
  let fixture: ComponentFixture<ApartmentMiniSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentMiniSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentMiniSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
