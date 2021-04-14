import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectionDropdownControl} from './control-selection-dropdown';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-selection-dropdown',
  templateUrl: './selection-dropdown.component.html',
  styleUrls: ['./selection-dropdown.component.scss']
})
export class SelectionDropdownComponent implements OnInit {

  @Input() control: SelectionDropdownControl<any>;
  @Input() form: FormGroup;
  @Output() valueChanged = new EventEmitter();

  ngOnInit(): void {
  }

  input($event) {
    this.control.value = $event.target.value;
    this.valueChanged.emit($event);
  }
}
