import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../core/auth/auth.guard';
import {AuthModule} from '../../core/auth/auth.module';
import {MainLayoutComponent} from '../../shared/layout/main-layout.component';
import {ApartmentListComponent} from './apartment-list/apartment-list.component';
import {ApartmentDetailsComponent} from './apartment-details/apartment-details.component';
import {Role} from '../../core/auth/model/user';
import {ApartmentBrowserComponent} from './apartment-browser/apartment-browser.component';

const routes: Routes = [
  {
    path: 'apartment',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      role: [Role.ADMIN, Role.REALTOR]
    },
    children: [
      {
        path: '',
        component: ApartmentListComponent
      }
    ]
  },
  {
    path: 'home',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ApartmentBrowserComponent
      }
    ]
  },
  {
    path: 'apartment/:id',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ApartmentDetailsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthModule],
  exports: [RouterModule]
})
export class ApartmentsRoutingModule {
}
