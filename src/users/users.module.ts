import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../databases/database.module';
import { jobProvider } from '../jobs/queue.provider';
import { JwtAuthService } from '../auth/jwtAuth.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { createTransporter } from '../mailer/application.mailer';
import { welcomeEmail } from '../mailer/welcome.email';

@Module({
  controllers: [UsersController],
  providers: [
    JwtAuthService,
    JwtAuthGuard,
    UsersService,
    ...usersProviders,
    jobProvider,
    {
      provide: 'welcomeEmail',
      useFactory: async () => {
        return welcomeEmail(await createTransporter());
      },
    },
  ],
  imports: [DatabaseModule],
  exports: [],
})
export class UsersModule {}
