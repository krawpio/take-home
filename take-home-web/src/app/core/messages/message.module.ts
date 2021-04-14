import {NgModule} from '@angular/core';
import {MessagesComponent} from './messages.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [MessagesComponent],
  exports: [MessagesComponent],

  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule
  ]
})
export class MessageModule { }
