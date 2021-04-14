import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RadioControl} from './control-radio';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit{

  @Output() valueChanged = new EventEmitter();
  @Input() form: FormGroup;
  @Input() control: RadioControl;

  ngOnInit(): void {
  }
  input($event) {
    this.control.value = $event.source.value;
    this.valueChanged.emit($event);
  }
}
