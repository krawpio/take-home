export class InfoField {
  title: string;
  key: string;
  value: string;
  editable: boolean;

  constructor(options: Partial<InfoField> = {}) {
    this.title = options.title;
    this.value = options.value;
    this.key = options.key;
    this.editable = options.editable;
  }
}



