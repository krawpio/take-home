import {HttpModule, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Apartment} from './entities/apartment.entity';
import {ApartmentsService} from './apartments.service';
import {ApartmentsController} from './apartments.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Apartment]), HttpModule],
  controllers: [ApartmentsController],
  providers: [ApartmentsService]
})
export class ApartmentsModule {}
