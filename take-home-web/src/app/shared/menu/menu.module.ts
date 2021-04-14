import {NgModule} from '@angular/core';
import {MenuComponent} from './menu/menu.component';
import {MainMenuElementComponent} from './main-menu-element/main-menu-element.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    MenuComponent,
    MainMenuElementComponent
  ],
  imports: [
    MatIconModule,
    MatListModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    MainMenuElementComponent
  ],
})
export class MenuModule {
}
