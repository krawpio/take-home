import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TextboxControl} from './control-textbox';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {
  @Input() control: TextboxControl;
  @Input() form: FormGroup;
  @Output() valueChanged = new EventEmitter();

  ngOnInit(): void {
  }
  input($event) {
    this.control.value = $event.target.value;
    this.valueChanged.emit(this.control.value);
  }
}
