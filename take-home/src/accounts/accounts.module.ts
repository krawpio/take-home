import {Module} from '@nestjs/common';
import {AccountsService} from './accounts.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Account} from './entities/acount.entity';
import {AccountsController} from './accounts.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
