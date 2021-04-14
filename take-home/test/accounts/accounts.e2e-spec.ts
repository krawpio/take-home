import {Test} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Account} from '../../src/accounts/entities/acount.entity';
import {AccountsModule} from '../../src/accounts/accounts.module';
import {Role} from '../../src/auth/enums/role.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<Account>;

  beforeAll(async () => {
    // jest.setTimeout(30000);
    const module = await Test.createTestingModule({
      imports: [
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
    repository = module.get('AccountRepository');
  });


  it(`create account`, async () => {
    const response = await request(app.getHttpServer())
      .post('/accounts')
      .send({login: 'login', password: 'pass', role: 'ADMIN', firstName: 'first', lastName: 'last'});

    expect(response.status).toBe(201);
    expect(response.body.login).toBe('login');
  });


  it(`get all accounts`, async () => {
    await repository.save([
      {login: 'login1', password: 'pass', firstName: 'first', lastName: 'last', role: Role.CLIENT},
      {login: 'login2', password: 'pass', firstName: 'first', lastName: 'last', role: Role.ADMIN}
    ]);

    const response = await request(app.getHttpServer())
      .get('/accounts');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it(`get accounts by query `, async () => {
    await repository.save([
      {login: 'login1', password: 'pass', firstName: 'first', lastName: 'last', role: Role.CLIENT},
      {login: 'login2', password: 'pass', firstName: 'first', lastName: 'last', role: Role.ADMIN},
      {login: 'login3', password: 'pass', firstName: 'john', lastName: 'last', role: Role.ADMIN},
      {login: 'login4', password: 'pass', firstName: 'first', lastName: 'john', role: Role.ADMIN},
      {login: 'alog2', password: 'pass', firstName: 'first', lastName: 'last', role: Role.ADMIN},
      {login: 'other', password: 'pass', firstName: 'first', lastName: 'last', role: Role.ADMIN}
    ]);

    const response = await request(app.getHttpServer())
      .get('/accounts/findByFilter')
      .query({login: 'log', firstName: 'fir', lastName: 'las', role: 'ADMIN'});

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it(`update apartment`, async () => {
    await repository.save([
      {login: 'login1', password: 'pass', firstName: 'first', lastName: 'last', role: Role.CLIENT},
    ]);

    const findResponse = await request(app.getHttpServer())
      .get('/accounts');

    const response = await request(app.getHttpServer())
      .patch(`/accounts/${findResponse.body[0].id}`)
      .send({login: 'name-2'});

    expect(response.status).toBe(200);
    expect(response.body.login).toBe('name-2');
  });

  it(`delete apartment`, async () => {
    await repository.save([
      {login: 'login1', password: 'pass', firstName: 'first', lastName: 'last', role: Role.CLIENT},
    ]);

    const findResponse = await request(app.getHttpServer())
      .get('/accounts');

    let response = await request(app.getHttpServer())
      .delete(`/accounts/${findResponse.body[0].id}`);

    expect(response.status).toBe(200);
    response = await request(app.getHttpServer())
      .get('/accounts');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  it(`delete apartment`, async () => {
    await repository.save([
      {login: 'login1', password: 'pass', firstName: 'first', lastName: 'last', role: Role.CLIENT},
    ]);

    const findResponse = await request(app.getHttpServer())
      .get('/accounts');

    let response = await request(app.getHttpServer())
      .delete(`/accounts/${findResponse.body[0].id}`);

    expect(response.status).toBe(200);
    response = await request(app.getHttpServer())
      .get('/accounts');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

  afterEach(async () => {
    await repository.query(`DELETE
                            FROM account;`);
  });

  afterAll(async () => {
    await app.close();
  });
});
