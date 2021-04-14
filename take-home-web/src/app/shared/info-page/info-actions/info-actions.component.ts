import {Component, Input, OnInit} from '@angular/core';
import {ActionButton} from '../../search/actions/action-button';

@Component({
  selector: 'app-info-actions',
  templateUrl: './info-actions.component.html',
  styleUrls: ['./info-actions.component.scss']
})
export class InfoActionsComponent implements OnInit {

  @Input() actions: ActionButton<any>[];

  constructor() { }

  ngOnInit(): void {
  }

  functionApply(func: ActionButton<any>) {
    return func.action.call(this);
  }
}
