import {Component, Input, OnInit} from '@angular/core';

import {ControlBase} from '../control-base';
import {ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ControlComponent
    }
  ]
})
export class ControlComponent implements OnInit, ControlValueAccessor {

  @Input() control: ControlBase<any>;
  @Input() hideLabel: boolean;
  @Input() form: FormGroup;
  onChange: any = () => {};
  onTouched: any = () => {};


  constructor() {
    if (this.hideLabel === undefined) {
      this.hideLabel = false;
    }
  }

  ngOnInit(): void {
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }


  writeValue(value) {
    if (value) {
      this.control.value = value;
    }
  }

  onValueChange(value) {
    this.onChange(value);
    this.onTouched();
  }

  isInvalid(): boolean {
    if (this.form) {
      return this.form.controls[this.control.key].touched && this.form.controls[this.control.key].errors != null;
    }
    return false;
  }

}


