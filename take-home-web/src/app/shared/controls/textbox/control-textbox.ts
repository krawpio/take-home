import {ControlBase} from '../control-base';

export class TextboxControl extends ControlBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: Partial<TextboxControl> = {}) {
    super(options);
    this.type = options.type || '';
    this.value = options.value || '';
  }

  isChipAvailable(): boolean {
    return this.value?.length > 0;
  }
}
