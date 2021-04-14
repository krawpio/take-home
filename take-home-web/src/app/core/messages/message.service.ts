import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MessagesComponent} from './messages.component';
import {MessageData} from './message-data';

@Injectable({ providedIn: 'root' })
export class MessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  sendInfo(mes: string) {
    this.open(new MessageData({
      message: mes,
      cssClass: 'info'
    }));
  }

  // sendError(mes: string) {
  //   this.open(new MessageData({
  //     message: mes,
  //     cssClass: 'error'
  //   }));
  // }

  private open(messageData: MessageData) {
    this.snackBar.openFromComponent(
      MessagesComponent,
      {
        data: messageData,
        panelClass: 'snack-custom',
        horizontalPosition: 'right',
        verticalPosition: 'bottom',
        duration: 3000
      });
  }


}
