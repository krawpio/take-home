import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownControl} from './control-dropdown';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input() control: DropdownControl;
  @Input() form: FormGroup;
  @Output() valueChanged = new EventEmitter();

  ngOnInit(): void {
  }

  input($event) {
    this.control.value = $event.target.value;
    this.valueChanged.emit($event);
  }

}
