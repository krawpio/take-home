import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {DeserializeArray, JsonArray} from 'cerializr';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {GridTableComponent} from './grid-table/grid-table.component';
import {ControlBase} from '../controls/control-base';
import {FilterBase} from './filters/filter-base';
import {ActionButton} from './actions/action-button';
import {LoadingService} from '../overlay/loading.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent<T> implements OnInit {

  @Input() dataUrl: string;
  @Input() modelType: new(...args: any[]) => T;
  @Input() title: string;
  @Input() filters: FilterBase[];
  @Input() extendedFilters: ControlBase<any>[];
  @Input() actions: ActionButton<T>[];
  @Input() extendedFiltersStyle: string;

  @Output() itemsSelected = new EventEmitter();
  @ViewChild(GridTableComponent, {static: false}) gridTable: GridTableComponent;

  result$: Observable<T[]>;
  itemsNr: number;
  selected: T[] = [];

  panelOpenState: boolean;

  constructor(
    private http: HttpClient,
    private loaderService: LoadingService) {
  }

  ngOnInit(): void {
    this.panelOpenState = false;
    this.search();
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.gridTable.filter(filterValue);
  }

  search() {
    let httpParams = new HttpParams();

    this.panelOpenState = false;
    this.extendedFilters.forEach(c => {
        if (c.value != null) {
          httpParams = httpParams.set(`${c.key}`, c.value);
        }
        if (c.toValue != null) {
          httpParams = httpParams.set(`${c.key}_high`, c.toValue);
        }
      }
    );
    this.searchWithParams(httpParams);
  }

  searchWithFilter(filter: FilterBase) {
    this.filters.forEach(f => f.active = false);
    filter.active = true;
    const httpParams = new HttpParams();
    this.searchWithParams(httpParams.set(filter.key, filter.value));
  }

  filledFilters() {
    return this.extendedFilters
      .filter(filter => filter.isChipAvailable());
  }


  removeFilter(filter: ControlBase<any>) {
    filter.clearValue();
    this.search();
  }

  gridItemsSelected(event: T[]) {
    this.selected = event;
    this.itemsSelected.emit(event);
  }

  private searchWithParams(httpParams: HttpParams) {
    this.loaderService.open();
    this.selected = [];
    this.result$ = this.http.get(this.dataUrl, {params: httpParams}).pipe(
      map((res: JsonArray) => DeserializeArray(res, this.modelType)),
      tap(items => {
        this.itemsNr = items.length;
        this.loaderService.close();
      })
    );
  }


}
