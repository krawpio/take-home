import {autoserializeAs} from 'cerializr';
import {Column} from '../../../shared/search/grid-table/decorators/column';

export class Account {
  @autoserializeAs(Number)
  id: number;

  @autoserializeAs(String)
  @Column({
    title: 'Login',
    routerLink: '/account/',
    routerLinkIdName: 'id'
  })
  login: string;

  password: string;

  @autoserializeAs(String)
  @Column({
    title: 'First Name',
  })
  firstName: string;

  @autoserializeAs(String)
  @Column({
    title: 'Last Name',
  })
  lastName: string;

  @autoserializeAs(String)
  @Column({
    title: 'Role',
    dict: {
      ADMIN : 'Admin',
      REALTOR: 'Realtor',
      CLIENT: 'Client',
    }
  })
  role: string;
}
