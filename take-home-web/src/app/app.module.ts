import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {IconService} from './core/services/icon.service';
import {AppRoutingModule} from './app-routing.module';
import {SpinnerComponent} from './shared/overlay/spinner/spinner.component';
import {MainLayoutComponent} from './shared/layout/main-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MenuModule} from './shared/menu/menu.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MessageModule} from './core/messages/message.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AccountModule} from './modules/accounts/account.module';
import {httpInterceptorProviders} from './core/http-interceptors';
import {HttpClientModule} from '@angular/common/http';
import {ApartmentsModule} from './modules/apartments/apartments.module';
import {MapModule} from './shared/map/map.module';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    SpinnerComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MenuModule,
    BrowserAnimationsModule,
    MessageModule,
    AccountModule,
    ApartmentsModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MapModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private iconService: IconService) {
    iconService.registerIcons();
  }
}

