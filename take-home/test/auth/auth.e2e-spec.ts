import {Test} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Account} from '../../src/accounts/entities/acount.entity';
import {Role} from '../../src/auth/enums/role.enum';
import * as request from 'supertest';
import {AuthModule} from '../../src/auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {AccountsModule} from '../../src/accounts/accounts.module';
import {AccountsService} from '../../src/accounts/accounts.service';
import {hashSync} from 'bcrypt';


export function hashPassword(password): string {
  return hashSync(password, Number(process.env.HASH_SALT));
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let accountRepository: Repository<Account>;
  let accountService: AccountsService;

  beforeAll(async () => {
    // jest.setTimeout(30000);
    const module = await Test.createTestingModule({
      imports: [
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
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.development.env',
        }),
        AuthModule,
        AccountsModule
      ],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    accountRepository = module.get('AccountRepository');
    accountService = module.get('AccountsService');
  });

  beforeEach(async () => {
    await accountRepository.save({
      login: 'admin',
      password: hashPassword('adminpass'),
      role: Role.ADMIN,
      firstName: 'john',
      lastName: 'admin'})
    await accountRepository.save({
      login: 'realtor',
      password: hashPassword('pass'),
      role: Role.REALTOR,
      firstName: 'john',
      lastName: 'realtor'})
  });

  it('/no auth', () => {
    return request(app.getHttpServer())
      .get('/auth/profile')
      .expect(401);
  });


  it('/admin auth', async () => {
    const authResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'admin',
        password: 'adminpass'
      });

    const profile = await request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${authResponse.body.access_token}`);

    expect(profile.status).toBe(200);
    expect(profile.body.firstName).toBe('john');
  });


  it('/role auth', async () => {
    const authResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'realtor',
        password: 'pass'
      });

    return request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${authResponse.body.access_token}`)
      .send({login: 'login', password: 'pass', role: 'ADMIN', firstName: 'first', lastName: 'last'})
      .expect(403);
  });


  afterEach(async () => {
    await accountRepository.query(`DELETE
                                   FROM account;`);
  });

  afterAll(async () => {
    await app.close();
  });
});
