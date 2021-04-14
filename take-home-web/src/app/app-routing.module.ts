import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './core/auth/auth.guard';
import {AuthModule} from './core/auth/auth.module';
import {LoginComponent} from './modules/accounts/login/login.component';
import {MainLayoutComponent} from './shared/layout/main-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      }
    ]},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LoginComponent, data: {logout: 'true'}},
  {path: '**', redirectTo: ''}


];

@NgModule({
  imports: [
    AuthModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}


