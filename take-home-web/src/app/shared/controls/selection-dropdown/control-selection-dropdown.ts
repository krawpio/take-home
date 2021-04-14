import {ControlBase} from '../control-base';

export class SelectionDropdownControl<T> extends ControlBase<T> {
  controlType = 'selection-dropdown';
  options: {key: any, value: string}[] = [];

  constructor(options: Partial<SelectionDropdownControl<T>> = {}) {
    super(options);
    this.options = options.options || [];
    this.placeholder = this.placeholder || 'Wybierz z listy';
  }

  isChipAvailable(): boolean {
    return false;
  }
}
