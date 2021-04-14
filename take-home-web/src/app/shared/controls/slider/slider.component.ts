import {Component, Input, OnInit} from '@angular/core';
import {SliderControl} from './control-slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input() control: SliderControl;

  constructor() {
  }

  ngOnInit(): void {
  }

  setFromValue($event) {
    this.control.value = $event.target.value;
  }

  setToValue($event) {
    this.control.toValue = $event.target.value;
  }

}
