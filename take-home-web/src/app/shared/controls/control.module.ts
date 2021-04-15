import {ControlComponent} from './control/control.component';
import {NgModule} from '@angular/core';
import {DateComponent} from './date/date.component';
import {DropdownComponent} from './dropdown/dropdown.component';
import {TextboxComponent} from './textbox/textbox.component';
import {CommonModule} from '@angular/common';
import {MatControlsModule} from '../material/mat-controls.module';
import {SelectionDropdownComponent} from './selection-dropdown/selection-dropdown.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RadioComponent} from './radio/radio.component';
import {SliderComponent} from './slider/slider.component';
import {Ng5SliderModule} from 'ng5-slider';


@NgModule({
    declarations: [
        ControlComponent,
        DateComponent,
        DropdownComponent,
        TextboxComponent,
        SelectionDropdownComponent,
        RadioComponent,
        SliderComponent
    ],
  imports: [
    CommonModule,
    MatControlsModule,
    ReactiveFormsModule,
    Ng5SliderModule
  ],
  exports: [ControlComponent]
})
export class ControlModule {
}
