import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {Role} from '../auth/enums/role.enum';
import {Roles} from '../auth/auth.decorator';

import {AccountsService} from './accounts.service';
import {CreateAccountDto} from './dto/create-account.dto';
import {UpdateAccountDto} from './dto/update-account.dto';
import {QueryAccountsDto} from './dto/query-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {
    let queryDto = new QueryAccountsDto({})
    return this.accountsService.findAll(queryDto.conditions());
  }

  @Get('/findByFilter')
  async findByFilter(@Query() query) {
    let queryDto = new QueryAccountsDto(query)
    return this.accountsService.findAll(queryDto.conditions())
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.accountsService.remove([+id]);
  }

  @Post('deleteAll')
  @Roles(Role.ADMIN)
  removeAll(@Body() idsToDelete) {
    const ids = JSON.parse(idsToDelete['ids'])
    return this.accountsService.remove(ids);
  }
}
