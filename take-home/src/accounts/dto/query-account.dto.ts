import {Equal, ILike, Not} from 'typeorm';
import {Role} from '../../auth/enums/role.enum';

export class QueryAccountsDto {
  login: string ;
  firstName: string;
  lastName: string;
  role: Role;

  constructor(query) {
    this.login = query.login
    this.firstName = query.firstName
    this.lastName = query.lastName
    this.role = query.role? Role[query.role]: undefined
  }


  conditions() {
    let cond = {
      where: {
      }
    };
    this.like_option(cond, 'login', this.login)
    this.like_option(cond, 'firstName', this.firstName)
    this.like_option(cond, 'lastName', this.lastName)
    if (this.role && (this.role != Role.ADMIN)) {
      this.eq_option(cond, 'role', this.role)
    } else {
      cond.where['role'] = Not(Role.ADMIN)
    }
    return cond
  }

  like_option(cond, fieldName, field) {
    if (field) {
      cond.where[fieldName] = ILike(`%${field}%`)
    }
  }

  eq_option(cond, fieldName, field) {
    if (field) {
      cond.where[fieldName] = Equal(field)
    }
  }

}

