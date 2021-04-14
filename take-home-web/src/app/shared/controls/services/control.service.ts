import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';
import {ControlBase} from '../control-base';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(
  ) {
  }

  controlsToValidOptions(controls: ControlBase<any>[]) {
    const options = {};
    controls.forEach((control) =>
      options[control.key] = control.required ? ['', Validators.required] : ['']
    );
    return options;
  }


  controlsToModelEntity(modelEntity, controls: ControlBase<any>[]) {
    controls.forEach((control) => {
        if (control.type === 'number'){
          modelEntity[control.key] = +control.value;
        } else {
          modelEntity[control.key] = control.value;
        }
      }
    );
    return modelEntity;
  }

  findControlByKey(controls: ControlBase<any>[], key: string) {
    return controls.find((c) => c.key === key);
  }
}
