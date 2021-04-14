import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {tableSymbol} from './decorators/column';
import {ColumnModel} from './decorators/column.model';
import {TableModel} from './decorators/table.model';
import {cloneDeep, sortBy} from 'lodash';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';

/**
 * @title Table with pagination
 */
@Component({
  selector: 'app-grid-table',
  styleUrls: ['grid-table.component.scss'],
  templateUrl: 'grid-table.component.html',
})
export class GridTableComponent implements OnInit {

  private $tableModel: TableModel;

  dataSource: MatTableDataSource<any>;
  columns: ColumnModel[];
  displayedColumns: string[];
  selectionModel: SelectionModel<any>;


  @Input() noSelection: boolean;
  @Input() data: any[];

  @Output() itemsSelected = new EventEmitter<any[]>();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
  }

  ngOnInit() {
    this.selectionModel = new SelectionModel<any>(true, []);
    this.sort.start = 'desc';
    if (this.noSelection === undefined) {
      this.noSelection = false;
    }
    this.buildTable(cloneDeep(this.data));
  }

  private buildTable(data: any[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'select':
          return this.selectionModel.selected.includes(item);
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;
    if (data.length > 0) {
      this.$tableModel = data[0][tableSymbol];
      this.buildColumns();
    }
  }

  private buildColumns() {
    this.columns = this.$tableModel.columns;
    this.sortColumns();
    const displayedColumns = [];
    if (!this.noSelection) {
      displayedColumns.push('select');
    }
    this.displayedColumns = displayedColumns.concat(this.columns.map(col => col.key));
  }

  private sortColumns() {
    this.columns = sortBy(this.columns, ['order']);
  }

  filter(filterValue) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.filterSelection();
    this.dataSource.data
      .filter(row => this.selectionModel.isSelected(row) && !this.dataSource.filteredData.includes(row))
      .forEach(row => this.selectionModel.toggle(row));
    this.itemsSelected.emit(this.selectionModel.selected);
  }


  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionModel.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selectionModel.clear() :
      this.dataSource.filteredData.forEach(row => this.selectionModel.select(row));
    this.itemsSelected.emit(this.selectionModel.selected);
  }


  selectRow(row: any) {
    this.selectionModel.toggle(row);
    this.itemsSelected.emit(this.selectionModel.selected);
  }

  private filterSelection() {
    this.dataSource.data
      .filter(row => this.selectionModel.isSelected(row) && !this.dataSource.filteredData.includes(row))
      .forEach(row => this.selectionModel.toggle(row));
    this.itemsSelected.emit(this.selectionModel.selected);
  }
}

