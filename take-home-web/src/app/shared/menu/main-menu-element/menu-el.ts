import {Role} from '../../../core/auth/model/user';

export interface MenuEl {
  id: number;
  title: string;
  link: string;
  roles?: Role[];
}
