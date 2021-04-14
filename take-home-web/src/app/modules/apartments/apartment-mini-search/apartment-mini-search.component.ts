import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-apartment-mini-search',
  templateUrl: './apartment-mini-search.component.html',
  styleUrls: ['./apartment-mini-search.component.scss']
})
export class ApartmentMiniSearchComponent implements OnInit {
  panelOpenState: boolean;

  toggle() {
    this.panelOpenState = !this.panelOpenState;
  }

  header() {
    return this.panelOpenState ? 'Less filters' : 'More filters';
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
