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

  it('GET index /users', done => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toBeInstanceOf(Array);
        if (err) return done(err);
        done();
      });
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

    it('/users/1', done => {
      return request(app.getHttpServer())
        .get('/users/1')
        .expect(200)
        .end((err, res) => {
          expect(res.body).toHaveProperty('firstName');
          if (err) return done(err);
          done();
        });
    });
  });

  it('PUT update /users/1', done => {
    return request(app.getHttpServer())
      .put('/users/1')
      .send({ firstName: 'John2' })
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).toHaveProperty('firstName', 'John2');
        if (err) return done(err);
        done();
      });
  });
});

// describe('APPLICATION', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     app = await createApp();
//   });

//   it('DELETE destroy /users', done => {
//     request(app.getHttpServer())
//       .delete('/users/1')
//       .set('Accept', 'application/json')
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         done();
//       });
//   });
// });
