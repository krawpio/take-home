import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AccountService} from '../services/account.service';
import {Account} from '../model/account';
import {ControlBase} from '../../../shared/controls/control-base';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';
import {ActionButton} from '../../../shared/search/actions/action-button';
import {Role} from '../../../core/auth/model/user';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private router: Router
  ) {
  }

  account$: Observable<Account>;
  infoFields: ControlBase<any>[];
  actions: ActionButton<Account>[];
  updateUrl: string;


  ngOnInit(): void {
    this.getAccount();
  }


  private getAccount(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.updateUrl = `/accounts/${id}`;
    this.account$ = this.accountService.getAccount(id).pipe(
      tap(account => {
        this.infoFields = this.buildFields(account);
        this.actions = this.getActions(account);
      })
    );
  }

  private getActions(account: Account): ActionButton<Account>[] {
    return [
      new ActionButton({
        label: 'Delete Account',
        buttonType: 'flat',
        action: () => this.deleteAccount(account.id)
      }),
    ];
  }


  private deleteAccount(id: number): void {
    this.accountService.delete(id).subscribe(
      () => this.router.navigateByUrl('/account')
    );
  }

  private buildFields(account: Account): ControlBase<any>[] {
    return [
      new TextboxControl({
        label: 'Login',
        key: 'login',
        value: account.login
      }),
      new TextboxControl({
        label: 'First Name',
        key: 'firstName',
        value: account.firstName
      }),
      new TextboxControl({
        label: 'Last Name',
        key: 'lastName',
        value: account.lastName
      }),
      new TextboxControl({
        label: 'Role',
        value: account.role
      }),

    ];
  }
}
