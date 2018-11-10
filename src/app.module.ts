import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BreedsService } from './cats/breeds.service';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './resolvers/user.resolver';
import { CatsModule } from './cats/cats.module';
import { UsersService } from './users/users.service';
import { DatabaseModule } from './databases/database.module';
import { usersProviders } from './users/users.providers';

const axios = require('axios');

const getScope = headers => {
  // console.log(headers);
  return 'ADMIN';
};
@Module({
  imports: [
    UsersModule,
    CatsModule,
    GraphQLModule.forRoot({
      context: ({ req }) => {
        return { scope: getScope(req.headers) };
      },
      mocks: false,
      typePaths: ['../schema.graphql'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserResolver,
    UsersService,
    ...usersProviders,
    {
      provide: 'BreedsService',
      useValue: new BreedsService(axios),
    },
    DatabaseModule,
  ],
})
export class AppModule {}
