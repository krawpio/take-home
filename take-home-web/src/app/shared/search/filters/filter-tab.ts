import {FilterBase} from './filter-base';

export class FilterTab extends FilterBase {
  url: string;
  itemNr: number;

  constructor(options: Partial<FilterTab> = {}) {
    super(options);
    this.url = options.url;
    this.itemNr = options.itemNr || 0;
  }
}
