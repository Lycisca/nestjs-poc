import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { sequelizeInit } from '../src/databases/database.providers';

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

const truncateAll = async sequelize => {
  Object.keys(sequelize.models).map((key: any) => {
    const model = sequelize.models[key];
    model.destroy({ where: {}, truncate: true });
  });
};

const createUserByHttp = async (app, userFixture = undefined) => {
  const input = userFixture || {
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@mail.com',
    password: '12345678',
  };
  const query = `mutation($input: UserCreateInput!) {
    userCreate(input: $input) {
      id
      email
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
    const sequelize = await sequelizeInit();
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
    expect(data.user).toHaveProperty('id');
  });
});
