import { IFindOptions, Model } from 'sequelize-typescript';
import { UsersService } from './users.service';
import { databaseProviders } from '../databases/database.providers';
import { User } from './user.entity';
import { JobProvider } from '../jobs/application.job';
import { mockTransporter } from '../mailer/mailer.provider';
import { WelcomeEmail } from '../mailer/welcome.mailer';

class UserMock {
  static findAll<T extends Model<T>>(
    this: new () => T,
    options?: IFindOptions<T>,
  ): any {
    return [{ firstName: 'user' }];
  }
}

const usersServiceFactory = async repo => {
  await databaseProviders[0].useFactory();
  const welcomeEmail = WelcomeEmail(await mockTransporter());
  return new UsersService(new JobProvider(), repo, welcomeEmail);
};

describe('Users Service', () => {
  it('test database index query', async () => {
    const usersService = await usersServiceFactory(User);
    const users = await usersService.index();
    // expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThanOrEqual(0);
  });

  it('test interface', async () => {
    const usersService = await usersServiceFactory(UserMock);
    const users = await usersService.index();
    expect(users).toEqual([{ firstName: 'user' }]);
  });

  it('test create user', async () => {
    const usersService = await usersServiceFactory(User);
    const user = await usersService.create({
      email: 'email',
      password: 'password',
      firstName: 'Jhon',
      lastName: 'Dooe',
    });
    // expect(users).toBeInstanceOf(Array);
    expect(user).toHaveProperty('createdAt');
  });
});
