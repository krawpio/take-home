import {ControlBase} from '../control-base';

export class DateRangeControl extends ControlBase<string> {
  controlType = 'daterange';

  constructor(options: Partial<DateRangeControl> = {}) {
    super(options);
    this.placeholder = this.placeholder || 'rrrr-mm-dd';
  }

  isChipAvailable(): boolean {
    return (this.value?.length > 0) || (this.toValue?.length > 0);
  }

  getChipValue(): string {
    const vals = [];
    if (this.value?.length > 0) {
      vals.push(`Od: ${this.value}`);
    }
    if (this.toValue?.length > 0) {
      vals.push(`Do: ${this.toValue}`);
    }
    return vals.join(' ');
  }
}
