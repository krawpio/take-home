import {Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {AuthService} from './auth.service';
import {Roles, SkipAuth} from './auth.decorator';
import {Role} from './enums/role.enum';
import {CreateAccountDto} from '../accounts/dto/create-account.dto';
import {AccountsService} from '../accounts/accounts.service';
import {waitForDebugger} from 'inspector';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private accountsService: AccountsService
  ) {
  }

  @SkipAuth()
  @Post('signUp')
  @Roles(Role.ADMIN)
  async signUp(@Body() createAccountDto: CreateAccountDto) {
    if (! [Role.REALTOR, Role.CLIENT].includes(createAccountDto.role)) {
      throw new HttpException({
        status: HttpStatus.METHOD_NOT_ALLOWED
      }, HttpStatus.METHOD_NOT_ALLOWED);
    }
    const account = await this.accountsService.findByLogin(createAccountDto.login);
    if (account) {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'login already exists'
      }, HttpStatus.CONFLICT);
    }
    return this.accountsService.create(createAccountDto);
  }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
