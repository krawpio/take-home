import {Role} from '../../auth/enums/role.enum';

export class CreateAccountDto {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role
}
