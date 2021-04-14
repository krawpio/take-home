import {Component, Input, OnInit} from '@angular/core';
import {ControlBase} from '../../controls/control-base';

@Component({
  selector: 'app-info-general-content',
  templateUrl: './info-general-content.component.html',
  styleUrls: ['./info-general-content.component.scss']
})
export class InfoGeneralContentComponent implements OnInit {

  @Input() infoFields: ControlBase<any>[];
  @Input() editMode: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
