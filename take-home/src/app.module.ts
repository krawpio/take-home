import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ApartmentsModule} from './apartments/apartments.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {AccountsModule} from './accounts/accounts.module';
import {ConfigModule} from '@nestjs/config';
import {GeoModule} from './geo/geo.module';


@Module({
  controllers: [AppController],
  providers: [
    AppService
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    AccountsModule,
    ApartmentsModule,
    GeoModule
  ],
})
export class AppModule {
}
