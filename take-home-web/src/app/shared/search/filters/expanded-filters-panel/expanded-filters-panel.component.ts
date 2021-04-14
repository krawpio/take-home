import {Component, Input, OnInit} from '@angular/core';
import {ControlBase} from '../../../controls/control-base';

@Component({
  selector: 'app-expanded-filters-panel',
  templateUrl: './expanded-filters-panel.component.html',
  styleUrls: ['./expanded-filters-panel.component.scss']
})
export class ExpandedFiltersPanelComponent implements OnInit {

  @Input() controls: ControlBase<string>[] = [];
  @Input() style: string;

  constructor() {  }

  ngOnInit() {
  }

}
