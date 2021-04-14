export class ColumnModel {
  /** List of options */
  key: string;
  order: number;
  title: string;
  canSort: boolean;
  dict: {};
  defaultValue: string;
  prefix: string;
  sufix: string;
  format: string;
  routerLink: string;
  routerLinkIdName: string;
  routerPrefix: string;
  type: ColumnModelType;
  chipDict: {};


  constructor(options: Partial<ColumnModel> = {}) {
    this.key = options.key;
    this.order = options.order || 0;
    this.title = options.title || this.key;
    this.canSort = options.canSort || true;
    this.dict = options.dict;
    this.defaultValue = options.defaultValue;
    this.routerLink = options.routerLink;
    this.routerLinkIdName = options.routerLinkIdName;
    this.prefix = options.prefix;
    this.sufix = options.sufix;
    this.routerPrefix = options.routerPrefix;
    this.format = options.format;
    this.type = options.type || ColumnModelType.TEXT;
    this.chipDict = options.chipDict;
  }
}

export enum ColumnModelType {
  TEXT,
  NUMBER,
  DATE,
  CHIP
}
