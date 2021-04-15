import {Component, OnInit, ViewChild} from '@angular/core';
import {ControlBase} from '../../../shared/controls/control-base';
import {ActionButton} from '../../../shared/search/actions/action-button';
import {DropdownControl} from '../../../shared/controls/dropdown/control-dropdown';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';
import {Account} from '../model/account';
import {AccountService} from '../services/account.service';
import {SearchComponent} from '../../../shared/search/search.component';
import {MatDialog} from '@angular/material/dialog';
import {AccountAddDialogComponent} from '../account-add-dialog/account-add-dialog.component';
import {AccountAddData} from '../account-add-dialog/account-add-data';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  dataUrl = '/accounts/findByFilter';
  modelType = Account;
  title = 'Accounts';
  filters: ControlBase<any>[];
  actions: ActionButton<Account>[];
  filtersStyle = 'grid-column4';

  @ViewChild(SearchComponent, {static: true}) search: SearchComponent<Account>;


  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.filters = this.getFilters();
    this.actions = this.getActions();
  }


  private getFilters(): ControlBase<any>[] {
    return [

      new TextboxControl({
        key: 'login',
        label: 'Login',
        placeholder: 'Fill username',
        order: 1,
        width: 350
      }),

      new TextboxControl({
        key: 'firstName',
        label: 'First Name',
        order: 2,
        width: 350
      }),

      new TextboxControl({
        key: 'lastName',
        label: 'Last Name',
        order: 3,
        width: 350
      }),

      new DropdownControl({
        key: 'role',
        label: 'Account type',
        options: [
          {key: 'REALTOR',  value: 'Realtor'},
          {key: 'CLIENT',   value: 'Client'},
        ],
        order: 4,
        width: 300
      }),
    ];
  }

  private getActions(): ActionButton<Account>[] {
    return [
      new ActionButton({
        label: 'Create Account',
        buttonType: 'flat',
        isContext: false,
        action: () => this.createAccount()
      }),
      new ActionButton({
        label: 'Delete',
        buttonType: 'stroked',
        icon: 'delete_outline',
        action: (accounts: Account[]) => this.deleteAccounts(accounts)
      }),
    ];
  }


  private deleteAccounts(accounts: Account[]): void {
    this.accountService.deleteAll(accounts.map(a => a.id)).subscribe(
      () => this.search.search()
    );
  }
  private createAccount(): void {
    this.dialog.open(AccountAddDialogComponent, {
      width: '544px',
      data: new AccountAddData({url: '/accounts', message: 'Account has been created', redirect: true})
    });
  }
}
