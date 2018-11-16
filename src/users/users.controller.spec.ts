import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../databases/database.module';
import { JobProvider } from '../jobs/application.job';
import { JwtAuthService } from '../auth/jwtAuth.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { mockTransporter } from '../mailer/mailer.provider';
import { WelcomeEmail } from '../mailer/welcome.mailer';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        JwtAuthService,
        JwtAuthGuard,
        UsersService,
        ...usersProviders,
        {
          provide: 'jobProvider',
          useFactory: () => {
            new JobProvider();
          },
        },
        {
          provide: 'welcomeEmail',
          useFactory: async () => {
            return WelcomeEmail(await mockTransporter());
          },
        },
      ],
      imports: [DatabaseModule],
      exports: [],
    }).compile();

    usersService = module.get(UsersService);
    usersController = module.get(UsersController);
  });

  describe('index', () => {
    it('should return an array of users', async () => {
      const result = ['User1, User2'];
      jest.spyOn(usersService, 'index').mockImplementation(() => result);

      expect(await usersController.index()).toBe(result);
    });
  });

  describe('show', () => {
    it('should return a user', async () => {
      const result = { firstName: 'Nuria', lastName: 'Hernández' };
      jest.spyOn(usersService, 'show').mockImplementation(() => result);

      expect(await usersController.show(1)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a new user', async () => {
      const result = { firstName: 'Nuria', lastName: 'Hernández' };
      jest.spyOn(usersService, 'create').mockImplementation(() => result);

      expect(await usersController.create(result)).toBe(result);
    });
  });

  describe('create', () => {
    it('should return a new user', async () => {
      const result = { firstName: 'Nuria', lastName: 'Hernández' };
      jest.spyOn(usersService, 'create').mockImplementation(() => result);

      expect(await usersController.create(result)).toBe(result);
    });
  });

  describe('update', () => {
    it('should return a updated user', async () => {
      const result = { firstName: 'Nuria', lastName: 'Hernández' };
      jest
        .spyOn(usersService, 'update')
        .mockImplementation(() => ({ id: 1, ...result }));

      expect(await usersController.update(1, result)).toEqual({
        id: 1,
        ...result,
      });
    });
  });

  describe('destroy', () => {
    it('should return a updated user', async () => {
      const result = { firstName: 'Nuria', lastName: 'Hernández' };
      jest.spyOn(usersService, 'destroy').mockImplementation(() => result);

      expect(await usersController.destroy(1)).toEqual(result);
    });
  });
});
