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
import { RedisService } from './cache/redis.service';
import { JwtAuthService } from './auth/jwtAuth.service';
import { JwtAuthGuard } from './auth/auth.guard';
import { createTransporter } from './mailer/mailer.provider';
import { WelcomeEmail } from './mailer/welcome.mailer';

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
      typePaths: ['./**/*.graphql'],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserResolver,
    UsersService,
    ...usersProviders,
    JwtAuthService,
    JwtAuthGuard,
    jobProvider,
    {
      provide: 'BreedsService',
      useValue: new BreedsService(axios, new RedisService()),
    },
    {
      provide: 'welcomeEmail',
      useFactory: async () => {
        return WelcomeEmail(await createTransporter());
      },
    },
    DatabaseModule,
  ],
})
export class AppModule {}
