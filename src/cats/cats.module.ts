import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { DatabaseModule } from '../databases/database.module';
import { Cat } from './cat.entity';

@Module({
  controllers: [CatsController],
  providers: [
    {
      provide: 'CatsService',
      useValue: new CatsService(Cat),
    },
  ],
  imports: [DatabaseModule],
})
export class CatsModule {}
