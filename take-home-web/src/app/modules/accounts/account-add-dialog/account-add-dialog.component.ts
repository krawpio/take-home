import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ControlBase} from '../../../shared/controls/control-base';
import {AccountService} from '../services/account.service';
import {Router} from '@angular/router';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';
import {RadioControl} from '../../../shared/controls/radio/control-radio';
import {FormBuilder, FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Account} from '../model/account';
import {ControlService} from '../../../shared/controls/services/control.service';
import {AccountAddData} from './account-add-data';

@Component({
  selector: 'app-account-add-dialog',
  templateUrl: './account-add-dialog.component.html',
  styleUrls: ['./account-add-dialog.component.scss']
})
export class AccountAddDialogComponent implements OnInit {

  controls: ControlBase<any>[];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AccountAddDialogComponent>,
    private accountService: AccountService,
    private router: Router,
    private formBuilder: FormBuilder,
    private controlService: ControlService,
    @Inject(MAT_DIALOG_DATA) public data: AccountAddData,
  ) {
  }

  ngOnInit(): void {
    this.controls = this.getControls();
    this.form = this.formBuilder.group(this.controlService.controlsToValidOptions(this.controls));
  }
  get f() {
    return this.form.controls;
  }


  onSubmit(): void {
    this.form.markAllAsTouched();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    const account = this.controlService.controlsToModelEntity(new Account(), this.controls);
    this.accountService.createAccount(account, this.data.url, this.data.message)
      .pipe(first())
      .subscribe(
        data => {
          this.dialogRef.close();
          if (this.data.redirect) {
            this.router.navigate([`/account/${data.id}`]);
          }
        },
        error => {
          this.f.login.setErrors({incorrect: 'Login already exists'});
        });
  }

  private getControls(): ControlBase<any>[] {

    return [
      new TextboxControl({
        key: 'login',
        label: 'Login',
        placeholder: 'username',
        order: 1,
        width: 350,
        required: true
      }),

      new TextboxControl({
        key: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'password',
        order: 2,
        width: 350,
        required: true
      }),

      new TextboxControl({
        key: 'firstName',
        label: 'First Name',
        placeholder: 'First Name',
        order: 3,
        width: 350,
        required: true

      }),

      new TextboxControl({
        key: 'lastName',
        label: 'Last Name',
        placeholder: 'Last Name',
        order: 4,
        width: 350,
        required: true
      }),

      new RadioControl({
        key: 'role',
        label: 'Role',
        options: [
          {key: 'CLIENT',   value: 'Client'},
          {key: 'REALTOR',  value: 'Realtor'},
        ],
        order: 5,
        width: 300,
        required: true
      }),
    ];
  }
}
