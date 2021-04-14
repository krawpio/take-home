import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-expansion-grid',
  templateUrl: './expansion-grid.component.html',
  styleUrls: ['./expansion-grid.component.scss']
})
export class ExpansionGridComponent<T> implements OnInit {

  @Input() title: string;
  @Input() noSelection: boolean;
  @Input() data: any[];
  panelOpenState: boolean;

  @Output() itemsSelected = new EventEmitter();


  constructor() {
  }

  ngOnInit(): void {
    this.panelOpenState = true;
    if (this.noSelection === undefined) {
      this.noSelection = true;
    }
  }

  gridItemsSelected(event: T[]) {
    this.itemsSelected.emit(event);
  }

  toggle() {
    this.panelOpenState = !this.panelOpenState;
  }
}
