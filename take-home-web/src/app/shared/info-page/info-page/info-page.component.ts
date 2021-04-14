import {Component, Input, OnInit} from '@angular/core';
import {ActionButton} from '../../search/actions/action-button';
import {ControlBase} from '../../controls/control-base';
import {HttpClient} from '@angular/common/http';
import {LoadingService} from '../../overlay/loading.service';
import {MessageService} from '../../../core/messages/message.service';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  editMode: boolean;
  editButton: ActionButton<any>;
  confirmEditButton: ActionButton<any>;
  cancelEditButton: ActionButton<any>;

  @Input() actions: ActionButton<any>[];
  @Input() infoFields: ControlBase<any>[];
  @Input() title: string;
  @Input() updateUrl: string;
  @Input() editable: boolean;

  constructor(
    private loadingService: LoadingService,
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.editMode = false;
    if (this.infoFields?.length > 0) {
      const editable = this.infoFields.filter(field => field.key?.length > 0).length > 0;
      if (this.actions === undefined) {
        this.actions = [];
      }
      if (editable) {
        this.editButton = this.getEditAction();
        this.confirmEditButton = this.getConfirmEditAction();
        this.cancelEditButton = this.getCancelEditAction();

        this.actions = [
          this.editButton,
          this.confirmEditButton,
          this.cancelEditButton,
          ...this.actions];
      }
    }
  }

  private getEditAction(): ActionButton<any> {
    return new ActionButton({
      label: 'Update',
      buttonType: 'flat',
      action: () => {
        this.editMode = true;
        this.editButton.visible = false;
        this.cancelEditButton.visible = true;
        this.confirmEditButton.visible = true;
      }
    });
  }

  private getConfirmEditAction(): ActionButton<any> {
    return new ActionButton({
      label: 'Confirm update',
      buttonType: 'flat',
      visible: false,
      action: () => {
        this.updateEntity();
      }
    });
  }

  private getCancelEditAction(): ActionButton<any> {
    return new ActionButton({
      label: 'Cancel',
      visible: false,
      action: () => {
        this.editMode = false;
        this.editButton.visible = true;
        this.cancelEditButton.visible = false;
        this.confirmEditButton.visible = false;
      }
    });
  }

  private updateEntity() {
    const body = {};
    this.infoFields.forEach(field => {
      if (field.key.length > 0) {
        body[field.key] = field.value;
      }
    });
    this.loadingService.open();
    this.http.patch(this.updateUrl, body).subscribe(
      () => {
        this.editMode = false;
        this.editButton.visible = true;
        this.cancelEditButton.visible = false;
        this.confirmEditButton.visible = false;
        this.loadingService.close();
        this.messageService.sendInfo('Update completed!');
      },
      () => {
        // this.messageService.sendError(error);
        this.loadingService.close();
      }
    );
  }
}
