import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';
import {MessageData} from './message-data';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(
    public snackBarRef: MatSnackBarRef<MessagesComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: MessageData
  ) { }

  ngOnInit(): void {
  }

}
