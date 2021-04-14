import {Component, Input, OnInit} from '@angular/core';
import {ColumnModel, ColumnModelType} from '../decorators/column.model';
import {DecimalPipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss']
})
export class GridCellComponent implements OnInit {

  @Input() element: any[];
  @Input() column: ColumnModel;

  constructor(private decimalPipe: DecimalPipe) { }

  ngOnInit(): void {
  }

  cellValue(row, column: ColumnModel) {
    let val;
    if (column.dict != null && column.dict[row[column.key]] != null) {
      val = column.dict[row[column.key]];
    } else {
      val = row[column.key];
    }

    if (column.type === ColumnModelType.DATE) {
      if (val.getTime() === 0) {
        val = '';
      } else {
        val = formatDate(val, 'MM-dd-yyyy', 'en-US');
      }
    }
    if (column.type === ColumnModelType.NUMBER) {
      val = this.decimalPipe.transform(val, column.format, 'en-US');
    }
    if (column.sufix) {
      val = val + column.sufix;
    }
    if (column.prefix) {
      val = column.prefix + val;
    }
    if (this.isLink() && column.routerPrefix) {
      val = column.routerPrefix + val;
    }
    return val;
  }

  isLink() {
    return this.column.routerLink != null && this.element[this.column.routerLinkIdName] != null;
  }

  isChip() {
    return this.column.chipDict != null;
  }

  chipColor(): string {
    let val = this.element[this.column.key];
    if (this.column.chipDict[val] == null) {
      val = 'DEFAULT';
    }
    return this.column.chipDict[val];
  }
}
