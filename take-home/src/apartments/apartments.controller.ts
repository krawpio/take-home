import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException, HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors
} from '@nestjs/common';
import {ApartmentsService} from './apartments.service';
import {CreateApartmentDto} from './dto/create-apartment.dto';
import {UpdateApartmentDto} from './dto/update-apartment.dto';
import {Role} from '../auth/enums/role.enum';
import {Roles} from '../auth/auth.decorator';
import {QueryApartmentDto} from './dto/query-apartment.dto';
import {Apartment} from './entities/apartment.entity';
import {serialize} from 'class-transformer';
import {throwError} from 'rxjs';


@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {
  }

  @Post()
  @Roles(Role.REALTOR, Role.ADMIN)
  create(@Body() createApartmentDto: CreateApartmentDto) {
    createApartmentDto.createdDate = new Date();
    createApartmentDto.rentable = true;
    return this.apartmentsService.create(createApartmentDto);
  }

  @Get()
  async findAll(@Req() {user}) {
    const apartments: Apartment[] = await this.apartmentsService.findAll(user.role, user.id);
    return serialize(apartments);
  }

  @Get('findByFilter')
  async findByFilter(@Req() {user}, @Query() query) {
    let queryDto = new QueryApartmentDto(query);
    const apartments: Apartment[] = await this.apartmentsService.findAll(user.role, user.id, queryDto.conditions());
    return serialize(apartments);
  }


  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Req() {user}, @Param('id') id: string) {
    return this.apartmentsService.findOne(+id, user.role, user.id);
  }

  @Patch(':id')
  @Roles(Role.REALTOR, Role.ADMIN)
  async update(@Req() {user}, @Param('id') id: string, @Body() updateApartmentDto: UpdateApartmentDto) {
    const apartment = await this.apartmentsService.findOne(+id, user.role, user.id)
    if (apartment) {
      return this.apartmentsService.update(+id, updateApartmentDto);
    } else {
      throw new HttpException({
        status: HttpStatus.METHOD_NOT_ALLOWED,
      }, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  @Delete(':id')
  @Roles(Role.REALTOR, Role.ADMIN)
  async remove(@Req() {user}, @Param('id') id: string) {
    const apartment = await this.apartmentsService.findOne(+id, user.role, user.id)
    if (apartment) {
      return this.apartmentsService.remove(+id);
    } else {
      throw new HttpException({
        status: HttpStatus.METHOD_NOT_ALLOWED,
      }, HttpStatus.METHOD_NOT_ALLOWED);
    }
  }
}
