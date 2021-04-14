import {Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseInterceptors} from '@nestjs/common';
import {ApartmentsService} from './apartments.service';
import {CreateApartmentDto} from './dto/create-apartment.dto';
import {UpdateApartmentDto} from './dto/update-apartment.dto';
import {Role} from '../auth/enums/role.enum';
import {Roles} from '../auth/auth.decorator';
import {QueryApartmentDto} from './dto/query-apartment.dto';
import {Apartment} from './entities/apartment.entity';
import {serialize} from 'class-transformer';


@Controller('apartments')
export class ApartmentsController {
  constructor(private readonly apartmentsService: ApartmentsService) {
  }

  @Post()
  @Roles(Role.REALTOR, Role.ADMIN)
  create(@Body() createApartmentDto: CreateApartmentDto) {
    createApartmentDto.createdDate = new Date();
    return this.apartmentsService.create(createApartmentDto);
  }

  @Get()
  async findAll(@Req() {user}) {
    const apartments: Apartment[] = await this.apartmentsService.findAll(user.role);
    return serialize(apartments);
  }

  @Get('findByFilter')
  async findByFilter(@Req() {user}, @Query() query) {
    let queryDto = new QueryApartmentDto(query);
    const apartments: Apartment[] = await this.apartmentsService.findAll(user.role, queryDto.conditions());
    return serialize(apartments);
  }


  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Req() {user}, @Param('id') id: string) {
    return this.apartmentsService.findOne(+id, user.role, {});
  }

  @Patch(':id')
  @Roles(Role.REALTOR, Role.ADMIN)
  update(@Param('id') id: string, @Body() updateApartmentDto: UpdateApartmentDto) {
    return this.apartmentsService.update(+id, updateApartmentDto);
  }

  @Delete(':id')
  @Roles(Role.REALTOR, Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.apartmentsService.remove(+id);
  }
}
