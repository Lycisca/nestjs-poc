import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
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

const graphqlRequest = (app, query, variables = {}) => {
  return request(app.getHttpServer())
    .post('/graphql')
    .send({ query, variables })
    .set('Accept', 'application/json');
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

  it('QUERY { users { id } }', async () => {
    const response = await graphqlRequest(app, 'query { users { id } }').expect(
      200,
    );
    expect(response.body.data.users).toBeInstanceOf(Array);
  });
});
