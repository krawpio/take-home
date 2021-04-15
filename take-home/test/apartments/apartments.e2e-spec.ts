import {Test} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {ApartmentsModule} from '../../src/apartments/apartments.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Apartment} from '../../src/apartments/entities/apartment.entity';
import {AccountsModule} from '../../src/accounts/accounts.module';
import {Role} from '../../src/auth/enums/role.enum';
import {Account} from '../../src/accounts/entities/acount.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Apartment>;
  let accRepository: Repository<Account>;
  let realtorId = 1;

  beforeAll(async () => {
    // jest.setTimeout(30000);
    const module = await Test.createTestingModule({
      imports: [
        ApartmentsModule,
        AccountsModule,
        // Use the e2e_test database to run the tests
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'krawpio',
          password: '',
          database: 'take_home_test',
          entities: ['./**/*.entity.ts'],
          synchronize: false,
          logging: 'all'
        }),
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    repository = module.get('ApartmentRepository');
    accRepository = module.get('AccountRepository');
    await accRepository.save(
      [{login: 'realtor', password: 'pass', firstName: 'first', lastName: 'last', role: Role.REALTOR}]);
    const realtor = await accRepository.find({login:'realtor'});
    realtorId = realtor[0].id
  });


  it(`create apartment`, async () => {
    const response = await request(app.getHttpServer())
      .post('/apartments')
      .send(
        {name: 'n-1', description: 'd', address: 'a', price: 60.2, area: 34.2, rooms: 3, createdDate: Date(), realtorId: realtorId});

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('n-1');
  });


  afterEach(async () => {
    await repository.query(`DELETE FROM apartment;`);
  });

  afterAll(async () => {
    await repository.query(`DELETE FROM account;`);
    await app.close();
  });
});
