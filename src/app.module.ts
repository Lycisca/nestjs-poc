import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BreedsService } from './cats/breeds.service';
const axios = require('axios');

import { CatsModule } from './cats/cats.module';
@Module({
  imports: [UsersModule, CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'BreedsService',
      useValue: new BreedsService(axios),
    },
  ],
})
export class AppModule {}
