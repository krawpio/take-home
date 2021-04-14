import {NgModule} from '@angular/core';
import {DialogFormComponent} from './dialog-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ControlModule} from '../controls/control.module';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    DialogFormComponent
  ],
  imports: [
    MatDialogModule,
    ControlModule,
    CommonModule,
    MatButtonModule,
  ],
  exports: [DialogFormComponent]
})
export class DialogModule {
}
