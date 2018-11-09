import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { sequelizeInit } from '../src/databases/database.providers';
import { throws } from 'assert';

const dotenv = require('dotenv');
dotenv.config({ path: '.env.test' });

const createApp = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app: INestApplication = moduleFixture.createNestApplication();
  return app.init();
};

const graphqlRequest = async (app, query, variables = {}) => {
  const { body } = await request(app.getHttpServer())
    .post('/graphql')
    .send({ query, variables })
    .set('Accept', 'application/json');
  if (body && body.errors && body.errors.length) {
    console.error('query error', query);
    console.error(body);
    throw new Error('invalid query');
  }
  return body;
};

const sequelize = sequelizeInit();

const truncateAll = sequelize => {
  Object.values(sequelize.models).map((model: any) =>
    model.destroy({ where: {}, truncate: true }),
  );
};

const createUserByHttp = async (app, userFixture = undefined) => {
  const input = userFixture || { firstName: 'John', lastName: 'Doe' };
  const query = `mutation($input: UserCreateInput!) {
    userCreate(input: $input) {
      id
      firstName
      lastName
    }
  }`;
  const { data } = await graphqlRequest(app, query, { input });
  return data.userCreate;
};

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    truncateAll(sequelize);
    app = await createApp();
  });

  it('QUERY { users { id } }', async () => {
    const response = await graphqlRequest(app, 'query { users { id } }');
    expect(response.data.users).toBeInstanceOf(Array);
  });

  it('QUERY { user(id: $id) { id } }', async () => {
    const user = await createUserByHttp(app);
    const { data } = await graphqlRequest(
      app,
      `query($id: ID!) {
        user(id: $id) {
          id
          firstName
          lastName
        }
      }`,
      { id: user.id },
    );
    console.log('USER', data);
    // expect(data.user).toHaveProperty('id');
  });
});
