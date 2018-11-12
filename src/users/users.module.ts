import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../databases/database.module';
import { jobProvider } from '../jobs/queue.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, jobProvider],
  imports: [DatabaseModule],
  exports: [],
})
export class UsersModule {}
