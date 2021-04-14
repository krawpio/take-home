import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';


@Component({
  selector: 'app-info-details',
  templateUrl: './info-details.component.html',
  styleUrls: ['./info-details.component.scss']
})
export class InfoDetailsComponent implements OnInit {

  @Input() title: string;

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
}
