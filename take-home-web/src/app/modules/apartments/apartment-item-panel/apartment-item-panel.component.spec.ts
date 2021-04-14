import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ApartmentItemPanelComponent} from './apartment-item-panel.component';

describe('ApartmentItemPanelComponent', () => {
  let component: ApartmentItemPanelComponent;
  let fixture: ComponentFixture<ApartmentItemPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartmentItemPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentItemPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
