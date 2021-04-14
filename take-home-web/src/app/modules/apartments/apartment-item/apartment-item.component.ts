import {Component, Input, OnInit} from '@angular/core';
import {Apartment} from '../model/apartment';

@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss']
})
export class ApartmentItemComponent implements OnInit {

  constructor() {
  }

  @Input() apartment: Apartment;

  ngOnInit(): void {
  }

}
