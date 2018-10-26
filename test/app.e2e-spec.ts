import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

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
        if (err) return done(err);
        done();
      });
  });

  it('GET index /users', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/users')
      .expect(200);
    expect(body).toBeInstanceOf(Array);
  });

  describe('GET show', () => {
    it('/users/user-name', () => {
      return request(app.getHttpServer())
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
