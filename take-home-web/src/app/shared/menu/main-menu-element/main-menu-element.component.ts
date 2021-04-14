import {Component, Input, OnInit} from '@angular/core';
import {MenuEl} from './menu-el';

@Component({
  selector: 'app-main-menu-element',
  templateUrl: './main-menu-element.component.html',
  styleUrls: ['./main-menu-element.component.scss']
})
export class MainMenuElementComponent implements OnInit {

  @Input() menu: MenuEl;
  @Input() selected: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
