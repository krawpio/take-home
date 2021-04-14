import {Role} from '../../../core/auth/model/user';

export class ActionButton<T> {
  label: string;
  icon: string;
  buttonType: string;
  visible: boolean;
  isContext: boolean;
  action: (params: T[]) => void;
  roles: Role[];

  constructor(options: Partial<ActionButton<T>> = {}) {
    this.label = options.label;
    this.icon = options.icon;
    this.buttonType = options.buttonType || 'default';
    this.action = options.action;
    if (options.visible !== undefined) {
      this.visible = options.visible;
    } else{
      this.visible = true;
    }
    if (options.isContext !== undefined) {
      this.isContext = options.isContext ;
    } else {
      this.isContext = true;
    }
  }
}
