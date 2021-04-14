export class FilterBase {
  value: string;
  key: string;
  title: string;
  active: boolean;

  constructor(options: Partial<FilterBase> = {}) {
    this.value = options.value;
    this.key = options.key;
    this.title = options.title;
    this.active = false;
  }
}
