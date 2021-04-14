import {Component, Input, OnInit} from '@angular/core';
import {FilterBase} from '../filter-base';

@Component({
  selector: 'app-filter-button',
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent implements OnInit {

  @Input() filter: FilterBase;

  constructor() { }

  ngOnInit(): void {
  }
}
