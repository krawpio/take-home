import {FilterTab} from './filter-tab';

export class FilterTabGroup<T> {
  title: string;
  filters: FilterTab[];
  itemNr: number;
  modelType: new(...args: any[]) => T;

  constructor(options: Partial<FilterTabGroup<T>> = {}) {
    this.title = options.title;
    this.filters = options.filters;
    this.modelType = options.modelType;
  }

  updateItemsNr() {
    this.itemNr = this.filters.map(f => f.itemNr).reduce((a, b) => a + b);
  }
}
