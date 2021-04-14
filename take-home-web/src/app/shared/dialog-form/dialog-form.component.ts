import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss']
})
export class DialogFormComponent implements OnInit {

  @Input() dialogRef: MatDialogRef<any>;
  @Input() title: string;


  constructor() {}

  ngOnInit(): void {}

  cancel(): void {
    this.dialogRef.close();
  }
}
