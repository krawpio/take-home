import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountAddDialogComponent} from './account-add-dialog.component';

describe('AccountAddDialogComponent', () => {
  let component: AccountAddDialogComponent;
  let fixture: ComponentFixture<AccountAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
