import {NgModule} from '@angular/core';
import {AccountListComponent} from './account-list/account-list.component';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {AccountRoutingModule} from './account-routing.module';
import {SearchModule} from '../../shared/search/search.module';
import {InfoPageModule} from '../../shared/info-page/info-page.module';
import {CommonModule} from '@angular/common';
import {AccountAddDialogComponent} from './account-add-dialog/account-add-dialog.component';
import {DialogModule} from '../../shared/dialog-form/dialog.module';
import {ControlModule} from '../../shared/controls/control.module';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AccountListComponent, AccountDetailsComponent, AccountAddDialogComponent],
  imports: [
    AccountRoutingModule,
    SearchModule,
    InfoPageModule,
    CommonModule,
    DialogModule,
    ControlModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
