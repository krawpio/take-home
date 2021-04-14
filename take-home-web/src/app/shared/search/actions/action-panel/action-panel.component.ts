import {Component, Input, OnInit} from '@angular/core';
import {ActionButton} from '../action-button';

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.scss']
})
export class ActionPanelComponent<T> implements OnInit {

  @Input() selected: T[];
  @Input() actions: ActionButton<T>[];

  constructor() { }

  ngOnInit(): void {
  }


  functionApply(func: ActionButton<T>) {
    return func.action.call(this, this.selected);
  }

  disabled(action: ActionButton<T>): boolean {
    return action.isContext && (this.selected.length === 0);
  }

}
