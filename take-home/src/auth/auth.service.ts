import {Injectable} from '@nestjs/common';
import {AccountsService} from '../accounts/accounts.service';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.accountsService.findByLogin(login);
    if (bcrypt.compareSync(pass, user.password)) {
      return user
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, firstName: user.firstName, lastName:user.lastName, role:user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
