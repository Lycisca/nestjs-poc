import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello world!!!!!');
  });

  it('/users/user-name (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/user-name')
      .expect(400)
      .expect({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validation failed',
      });
  });
});
