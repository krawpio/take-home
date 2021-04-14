import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {formatDate} from '@angular/common';
import {DateControl} from './control-date';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {

  @Input() control: DateControl;
  @Input() form: FormGroup;
  @Output() valueChanged = new EventEmitter();

  ngOnInit(): void {
  }


  dateFilter = (): boolean => {
    return true;
  }

  setValue($event: MatDatepickerInputEvent<Date>) {
    this.control.value = formatDate($event.value, 'yyyy-MM-dd', 'pl');
    this.valueChanged.emit($event);
  }

}
