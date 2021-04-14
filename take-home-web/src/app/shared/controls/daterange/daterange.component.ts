import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DateRangeControl} from './control-daterange';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDate} from '@angular/common';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-daterange',
  templateUrl: './daterange.component.html',
  styleUrls: ['./daterange.component.scss']
})
export class DaterangeComponent implements OnInit {

  @Input() control: DateRangeControl;
  @Input() form: FormGroup;
  @Output() valueChanged = new EventEmitter();

  dateFilter = (d: Date | null): boolean => {
    return d < new Date();
  }

  constructor() { }

  ngOnInit(): void {
  }

  setFromValue($event: MatDatepickerInputEvent<Date>) {
    this.control.value = formatDate($event.value, 'yyyy-MM-dd', 'pl');
    this.valueChanged.emit($event);
  }

  setToValue($event: MatDatepickerInputEvent<Date>) {
    this.control.toValue = formatDate($event.value, 'yyyy-MM-dd', 'pl');
    this.valueChanged.emit($event);

  }

}
