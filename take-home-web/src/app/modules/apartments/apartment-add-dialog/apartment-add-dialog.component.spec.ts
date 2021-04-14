import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ApartmentAddDialogComponent} from './apartment-add-dialog.component';

describe('ApartmentAddDialogComponent', () => {
  let component: ApartmentAddDialogComponent;
  let fixture: ComponentFixture<ApartmentAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
