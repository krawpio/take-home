import {NgModule} from '@angular/core';
import {LoginComponent} from '../../modules/accounts/login/login.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {JwtAuthInterceptor} from './jwt-auth-interceptor.service';
import {ErrorInterceptor} from './error.interceptor';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatControlsModule} from '../../shared/material/mat-controls.module';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtAuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatControlsModule
  ]
})
export class AuthModule { }
