import {ControlBase} from '../control-base';

export class DateControl extends ControlBase<string> {
  controlType = 'date';

  constructor(options: Partial<DateControl> = {}) {
    super(options);
    this.placeholder = this.placeholder || 'rrrr-mm-dd';
  }

  isChipAvailable(): boolean {
    return (this.value?.length > 0);
  }

  getChipValue(): string {
    if (this.value?.length > 0) {
      return this.value;
    }
    return '';
  }
}
