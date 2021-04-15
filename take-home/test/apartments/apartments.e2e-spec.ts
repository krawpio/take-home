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
import {hashSync} from 'bcrypt';
import {AuthModule} from '../../src/auth/auth.module';
import {ConfigModule} from '@nestjs/config';

export function hashPassword(password): string {
  return hashSync(password, Number(process.env.HASH_SALT));
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Apartment>;
  let accRepository: Repository<Account>;
  let realtorId = 1;
  let accessToken = '';

  beforeAll(async () => {
    // jest.setTimeout(30000);
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.development.env',
        }),
        AuthModule,
        AccountsModule,
        ApartmentsModule,
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
      [{login: 'realtor', password: hashPassword('pass'), firstName: 'first', lastName: 'last', role: Role.REALTOR}]);
    const realtor = await accRepository.find({login: 'realtor'});
    realtorId = realtor[0].id;
  });

  beforeEach(async () => {
      const authResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          username: 'realtor',
          password: 'pass'
        });
      accessToken = authResponse.body.access_token;
    }
  );

  it(`create apartment`, async () => {
    const response = await request(app.getHttpServer())
      .post('/apartments')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(
        {name: 'n-1', description: 'd', address: 'a', price: 60.2, area: 34.2, rooms: 3, createdDate: Date(), realtorId: realtorId});

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('n-1');
  });

  it(`get all apartments`, async () => {

    await repository.save([
      {
        name: 'n-1',
        description: 'd',
        address: 'a',
        price: 6,
        area: 3,
        rooms: 3,
        createdDate: Date(),
        realtorId: realtorId,
        rentable: false
      },
      {
        name: 'n-2',
        description: 'd',
        address: 'a',
        price: 6,
        area: 3,
        rooms: 3,
        createdDate: Date(),
        realtorId: realtorId,
        rentable: false
      },
    ]);

    const response = await request(app.getHttpServer())
      .get('/apartments')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).length).toBe(2);
  });

  it(`get apartments by query `, async () => {
    await repository.save([
      {
        name: 'n-1',
        description: 'd',
        address: 'a',
        price: 1000,
        area: 40,
        rooms: 3,
        createdDate: Date(),
        realtorId: realtorId,
        rentable: false
      },
      {
        name: 'n-2',
        description: 'd',
        address: 'a',
        price: 2000,
        area: 50,
        rooms: 5,
        createdDate: Date(),
        realtorId: realtorId,
        rentable: false
      },
      {
        name: 'n-3',
        description: 'd',
        address: 'a',
        price: 2000,
        area: 60,
        rooms: 4,
        createdDate: Date(),
        realtorId: realtorId,
        rentable: false
      },
      {
        name: 'n-4',
        description: 'd',
        address: 'a',
        price: 3000,
        area: 50,
        rooms: 5,
        createdDate: Date(),
        realtorId: realtorId,
        rentable: false
      },
      {
        name: 'n-5',
        description: 'd',
        address: 'a',
        price: 2000,
        area: 20,
        rooms: 6,
        createdDate: Date(),
        realtorId: realtorId,
        rentable: false
      },
      {
        name: 'n-6',
        description: 'd',
        address: 'a',
        price: 2000,
        area: 50,
        rooms: 1,
        createdDate: Date(),
        realtorId: realtorId,
        rentable: false
      }
    ]);

    const response = await request(app.getHttpServer())
      .get('/apartments/findByFilter')
      .set('Authorization', `Bearer ${accessToken}`)
      .query({price: 1500, price_high: 3000, rooms: 2, area_high: 30});

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).length).toBe(1);
  });

  it(`update apartment`, async () => {
    await repository.save([
      {name: 'n-2', description: 'd', address: 'a', price: 2000, area: 50, rooms: 1, createdDate: Date(), realtorId: realtorId, rentable:true}
    ]);
    const apartment = await repository.find({name: 'n-2'});
    const response = await request(app.getHttpServer())
      .patch(`/apartments/${apartment[0].id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({name: 'n-2'});

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('n-2');
  });

  it(`delete apartment`, async () => {
    await repository.save([
      {name: 'n-1', description: 'd', address: 'a', price: 2000, area: 50, rooms: 1, createdDate: Date(), realtorId: realtorId, rentable:true}
    ]);

    const apartment = await repository.find({name: 'n-1'});
    let response = await request(app.getHttpServer())
      .delete(`/apartments/${apartment[0].id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.status).toBe(200);
    response = await request(app.getHttpServer())
      .get('/apartments')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.status).toBe(200);
    expect(JSON.parse(response.text).length).toBe(0);
  });

  afterEach(async () => {
    await repository.query(`DELETE
                            FROM apartment;`);
  });

  afterAll(async () => {
    await accRepository.query(`DELETE
                               FROM account;`);
    await app.close();
  });
});
