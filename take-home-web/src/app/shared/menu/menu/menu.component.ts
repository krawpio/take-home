import {Component, OnInit} from '@angular/core';
import {MenuEl} from '../main-menu-element/menu-el';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../core/auth/authentication.service';
import {Role} from '../../../core/auth/model/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  selectedMenu: MenuEl;

  menuElements: MenuEl[];


  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    const allMenus: MenuEl[] = [
      {id: 1, title: 'Apartment Browser', link: '/home'},
      {id: 2, title: 'Accounts', link: '/account', roles: [Role.ADMIN]},
      {id: 3, title: 'Apartments', link: '/apartment', roles: [Role.ADMIN, Role.REALTOR]},
      {id: 4, title: 'Sign out', link: '/logout'}
    ];
    const role: Role = this.authenticationService.role;
    this.menuElements = allMenus.filter((menuEl) =>
      menuEl.roles ?
        menuEl.roles.includes(role)
        : true);
  }

  onSelect(menu: MenuEl): void {
    this.selectedMenu = menu;
  }

  isActive(menu: MenuEl) {
    return this.router.url.startsWith(menu.link);
  }
}


