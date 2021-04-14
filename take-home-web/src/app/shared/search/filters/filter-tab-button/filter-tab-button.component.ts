import {Component, Input, OnInit} from '@angular/core';
import {FilterTab} from '../filter-tab';

@Component({
  selector: 'app-filter-tab-button',
  templateUrl: './filter-tab-button.component.html',
  styleUrls: ['./filter-tab-button.component.scss']
})
export class FilterTabButtonComponent implements OnInit {
  @Input() filter: FilterTab;

  constructor() { }

  ngOnInit(): void {
  }

}
