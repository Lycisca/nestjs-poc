import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { kueInit } from '../src/jobs/queue.provider';
const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

const createApp = async () => {
  let app: INestApplication;
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  return app.init();
};

const createUserByHttp = (app, userFixture = undefined) =>
  request(app.getHttpServer())
    .post('/users')
    .send(userFixture || { firstName: 'John', lastName: 'Doe' })
    .set('Accept', 'application/json')
    .expect(201);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
  });

  it('GET root/', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello world!!!!!');
  });

  it('POST create /users', done => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ firstName: 'John', lastName: 'Doe' })
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('firstName');
        expect(res.body).toHaveProperty('createdAt');
        if (err) return done(err);
        done();
      });
  });

  it('GET index /users without headers', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .expect(403)
      .expect({
        error: 'Forbidden',
        message: 'Forbidden resource',
        statusCode: 403,
      });
  });

  it('GET index /users with headers', async () => {
    await request(app.getHttpServer())
      .get('/users')
      .set('authorization', process.env.API_TOKEN)
      .expect(200);
  });

  describe('GET show', () => {
    it('/users/user-name', async () => {
      await request(app.getHttpServer())
        .get('/users/user-name')
        .expect(400)
        .expect({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Validation failed',
        });
    });

    it('/users/:id', async () => {
      const { body } = await createUserByHttp(app);
      const response = await request(app.getHttpServer())
        .get(`/users/${body.id}`)
        .expect(200);
      expect(response.body).toHaveProperty('firstName');
    });
  });

  it('PUT update /users/:id', async () => {
    const { body } = await createUserByHttp(app);
    const response = await request(app.getHttpServer())
      .put(`/users/${body.id}`)
      .send({ firstName: 'John2' })
      .set('Accept', 'application/json')
      .expect(200);
    expect(response.body).toHaveProperty('firstName', 'John2');
  });

  it('DELETE destroy /users', async () => {
    const { body } = await createUserByHttp(app);

    const response = await request(app.getHttpServer())
      .delete(`/users/${body.id}`)
      .set('Accept', 'application/json')
      .expect(200);
  });
});

afterAll(() => {
  const Job = kueInit();
  Job.shutdown(5000, function(err) {
    console.log('Kue shutdown: ', err || '');
  });
});
