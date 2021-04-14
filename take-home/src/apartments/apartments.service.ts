import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Equal, FindOneOptions, Repository} from 'typeorm';
import {Apartment} from './entities/apartment.entity';
import {CreateApartmentDto} from './dto/create-apartment.dto';
import {UpdateApartmentDto} from './dto/update-apartment.dto';
import {FindManyOptions} from 'typeorm/find-options/FindManyOptions';
import {Role} from '../auth/enums/role.enum';


@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment)
    private apartmentsRepository: Repository<Apartment>,
  ) {
  }

  async create(createApartmentDto: CreateApartmentDto): Promise<Apartment> {
    return this.apartmentsRepository.save(this.apartmentsRepository.create(createApartmentDto));
  }

  async findAll(role: Role, options?: FindManyOptions): Promise<Apartment[]> {
    return this.apartmentsRepository.find(ApartmentsService.roleOptions(role, options));
  }

  findOne(id: number, role: Role, options?: FindOneOptions) {
    return this.apartmentsRepository.findOne(id, ApartmentsService.roleOptions(role, options));
  }

  update(id: number, updateApartmentDto: UpdateApartmentDto) {
    return this.apartmentsRepository.save(this.apartmentsRepository.create({id, ...updateApartmentDto}));
  }

  remove(id: number) {
    return this.apartmentsRepository.delete(id);
  }

  private static roleOptions(role, options) {
    if (role == Role.CLIENT) {
      if (options) {
        options.where['rentable'] = Equal(true);
        return options;
      } else {
        return {where: {rentable : Equal(true)}};
      }
    }
    return options;
  }


}
