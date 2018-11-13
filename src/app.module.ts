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
import { jobProvider } from './jobs/queue.provider';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

const axios = require('axios');

const getScope = headers => {
  // console.log(headers);
  return 'ADMIN';
};

@Module({
  imports: [
    UsersModule,
    CatsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    GraphQLModule.forRoot({
      context: ({ req }) => {
        return { scope: getScope(req.headers) };
      },
      mocks: false,
      typePaths: ['./**/*.graphql'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserResolver,
    UsersService,
    ...usersProviders,
    AuthService,
    JwtStrategy,
    jobProvider,
    {
      provide: 'BreedsService',
      useValue: new BreedsService(axios),
    },
    DatabaseModule,
  ],
})
export class AppModule {}
