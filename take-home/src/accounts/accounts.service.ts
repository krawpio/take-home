import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Account} from './entities/acount.entity';
import {CreateAccountDto} from './dto/create-account.dto';
import {UpdateAccountDto} from './dto/update-account.dto';
import {FindManyOptions} from 'typeorm/find-options/FindManyOptions';


@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {
  }

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountRepository.save(this.accountRepository.create(createAccountDto));
  }

  async findAll(options?: FindManyOptions): Promise<Account[]> {
    return this.accountRepository.find(options);
  }

  findOne(id: number) {
    return this.accountRepository.findOne(id);
  }

  async findByLogin(username: string) {
    return this.accountRepository.findOne({login: username});
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return this.accountRepository.save(this.accountRepository.create({id, ...updateAccountDto}));
  }

  remove(id: number[]) {
    return this.accountRepository.delete(id);
  }
}
