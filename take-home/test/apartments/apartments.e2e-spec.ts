import {Test} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {ApartmentsModule} from '../../src/apartments/apartments.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Apartment} from '../../src/apartments/entities/apartment.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Apartment>;

  beforeAll(async () => {
    // jest.setTimeout(30000);
    const module = await Test.createTestingModule({
      imports: [
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
  });


  it(`create apartment`, async () => {
    const response = await request(app.getHttpServer())
      .post('/apartments')
      .send({name: 'n-1', description: 'd', price: 60.2, createdDate: Date(), lat: 40.45, long: 50.23});

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('n-1');
  });


  it(`get all apartments`, async () => {
    await repository.save([
      {name: 'n-1', description: 'desc', address: 'a', rooms: 3, area: 40, price: 60.2, createdDate: Date(), lat: 40.45, long: 50.23},
      {name: 'n-2', description: 'desc', address: 'a', rooms: 3, area: 40, price: 60.2, createdDate: Date(), lat: 40.45, long: 50.23}
    ]);

    const response = await request(app.getHttpServer())
      .get('/apartments')

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it(`get apartments by query `, async () => {
    await repository.save([
      {name: 'n-1', description: 'd', address: 'a', rooms: 3, area: 40, price: 1000, createdDate: Date(), lat: 1, long: 1},
      {name: 'n-2', description: 'd', address: 'a', rooms: 5 ,area: 50, price: 2000, createdDate: Date(), lat: 1, long: 1},
      {name: 'n-3', description: 'd', address: 'a', rooms: 4 ,area: 60, price: 2000, createdDate: Date(), lat: 1, long: 1},
      {name: 'n-4', description: 'd', address: 'a', rooms: 2 ,area: 50, price: 3000, createdDate: Date(), lat: 1, long: 1},
      {name: 'n-5', description: 'd', address: 'a', rooms: 6 ,area: 20, price: 2000, createdDate: Date(), lat: 1, long: 1},
      {name: 'n-6', description: 'd', address: 'a', rooms: 1 ,area: 50, price: 2000, createdDate: Date(), lat: 1, long: 1}
    ]);

    const response = await request(app.getHttpServer())
      .get('/apartments/findByFilter')
      .query({price_low: 1500, price_height: 3000, rooms_low: 2, area_low: 30});

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });

  it(`update apartment`, async () => {
    await repository.save([
      {name: 'n-1', description: 'desc', address: 'a', rooms: 1 ,area: 50, price: 60.2, createdDate: Date(), lat: 40.45, long: 50.23},
    ]);

    const findResponse = await request(app.getHttpServer())
      .get('/apartments')

    const response = await request(app.getHttpServer())
      .patch(`/apartments/${findResponse.body[0].id}`)
      .send({name: 'n-2'});

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('n-2');
  });

  it(`delete apartment`, async () => {
    await repository.save([
      {name: 'n-1', description: 'desc', address: 'a', rooms: 1 ,area: 50, price: 60.2, createdDate: Date(), lat: 40.45, long: 50.23},
    ]);

    const findResponse = await request(app.getHttpServer())
      .get('/apartments')

    let response = await request(app.getHttpServer())
      .delete(`/apartments/${findResponse.body[0].id}`);

    expect(response.status).toBe(200);
    response = await request(app.getHttpServer())
      .get('/apartments')
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  afterEach(async () => {
    await repository.query(`DELETE FROM apartment;`);
  });

  afterAll(async () => {
    await app.close();
  });
});
