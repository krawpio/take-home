import {Component, Input, OnInit} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {DeserializeArray, JsonArray} from 'cerializr';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {FilterTab} from '../filters/filter-tab';
import {FilterTabGroup} from '../filters/filter-tab-group';

@Component({
  selector: 'app-tab-grid',
  templateUrl: './tab-grid.component.html',
  styleUrls: ['./tab-grid.component.scss']
})
export class TabGridComponent implements OnInit {

  private filters: FilterTab[];
  @Input() filterGroups: FilterTabGroup<any>[];

  result$: Observable<any[]>;
  panelOpenState: boolean;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.panelOpenState = false;
    this.filters = this.filterGroups
      .map(fg => fg.filters)
      .reduce((a , b) => a.concat(b));
    this.filterGroups.forEach(fg => fg.filters.forEach(f => this.getItems(f, fg)));
  }

  filterApply(filter: FilterTab, modelType) {
    if (filter.active) {
      filter.active = false;
      this.panelOpenState = false;
    } else {
      this.filters.forEach(f => f.active = false);
      filter.active = true;
      this.search(filter, modelType);
      this.panelOpenState = true;
    }
  }


  private search(filter: FilterTab, modelType) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set(filter.key, filter.value);
    this.result$ = this.http.get(filter.url, {params: httpParams}).pipe(
      map((res: JsonArray) => DeserializeArray(res, modelType)),
      tap(items => filter.itemNr = items.length)
    );
  }

  private getItems(filter: FilterTab, fg: FilterTabGroup<any>) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set(filter.key, filter.value);
    this.http.get(filter.url, {params: httpParams})
      .subscribe((res: JsonArray) => {
        filter.itemNr = res.length;
        fg.updateItemsNr();
      }
    );
  }
}
