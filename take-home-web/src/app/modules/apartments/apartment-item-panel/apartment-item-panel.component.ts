import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../model/apartment';

@Component({
  selector: 'app-apartment-item-panel',
  templateUrl: './apartment-item-panel.component.html',
  styleUrls: ['./apartment-item-panel.component.scss']
})
export class ApartmentItemPanelComponent implements OnInit {

  constructor() { }

  @Input() apartments: Apartment[];


  ngOnInit(): void {
  }
}
