import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../core/auth/auth.guard';
import {AuthModule} from '../../core/auth/auth.module';
import {MainLayoutComponent} from '../../shared/layout/main-layout.component';
import {AccountListComponent} from './account-list/account-list.component';
import {AccountDetailsComponent} from './account-details/account-details.component';
import {Role} from '../../core/auth/model/user';

const routes: Routes = [
  {
    path: 'account',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Role.ADMIN]
    },
    children: [
      {
        path: '',
        component: AccountListComponent
      }
    ]
  },
  {
    path: 'account/:id',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Role.ADMIN]
    },
    children: [
      {
        path: '',
        component: AccountDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthModule],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
