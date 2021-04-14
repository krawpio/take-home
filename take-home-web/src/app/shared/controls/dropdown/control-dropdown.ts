import {ControlBase} from '../control-base';

export class DropdownControl extends ControlBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(options: Partial<DropdownControl> = {}) {
    super(options);
    this.options = options.options || [];
    this.placeholder = this.placeholder || 'Choose from the list';
  }

  isChipAvailable(): boolean {
    return this.value?.length > 0;
  }

  getChipValue(): string {
    return this.options.filter(f => f.key === this.value)[0].value;
  }
}
