import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {AuthService} from './auth.service';
import {SkipAuth} from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
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
