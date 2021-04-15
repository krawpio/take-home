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

  async findAll(role: Role, userId: number, options?: FindManyOptions): Promise<Apartment[]> {
    return this.apartmentsRepository.find(ApartmentsService.roleOptions(role, userId, options));
  }

  async findOne(id: number, role: Role, userId: number, options?: FindOneOptions) {
    return this.apartmentsRepository.findOne(id, ApartmentsService.roleOptions(role, userId, options));
  }

  update(id: number, updateApartmentDto: UpdateApartmentDto) {
    return this.apartmentsRepository.save(this.apartmentsRepository.create({id, ...updateApartmentDto}));
  }

  remove(id: number) {
    return this.apartmentsRepository.delete(id);
  }

  private static roleOptions(role, userId, options) {
    if (role == Role.CLIENT) {
      if (options) {
        options.where['rentable'] = Equal(true);
        return options;
      } else {
        return {where: {rentable : Equal(true)}};
      }
    } else if (role == Role.REALTOR) {
      if (options) {
        options.where['realtorId'] = Equal(userId);
        return options;
      } else {
        return {where: {realtorId : Equal(userId)}};
      }
    }
    return options;
  }


}
