import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LocalStrategy} from './strategy/local.strategy';
import {JwtStrategy} from './strategy/jwt.strategy';
import {AccountsModule} from '../accounts/accounts.module';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller';
import {JwtAuthGuard} from './guards/jwt-auth.guard';
import {RolesGuard} from './guards/roles.guard';
import {APP_GUARD} from '@nestjs/core';
import {ConfigModule, ConfigService} from '@nestjs/config';


@Module({
  controllers: [AuthController],
  imports: [
    ConfigModule,
    AccountsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('SECRET_KEY')
        };
      },
      inject: [ConfigService]
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  exports: [AuthService],
})
export class AuthModule {
}
