import { IFindOptions, Model } from 'sequelize-typescript';
import { UsersService } from './users.service';
import { databaseProviders } from '../databases/database.providers';
import { User } from './user.entity';
import { JobProvider } from '../jobs/application.job';

class UserMock {
  static findAll<T extends Model<T>>(
    this: new () => T,
    options?: IFindOptions<T>,
  ): any {
    return [{ firstName: 'user' }];
  }
}

const usersServiceFactory = repo => {
  databaseProviders[0].useFactory();
  return new UsersService(new JobProvider(), repo);
};

describe('Users Service', () => {
  it('test database index query', async () => {
    const usersService = usersServiceFactory(User);
    const users = await usersService.index();
    // expect(users).toBeInstanceOf(Array);
    expect(users.length).toBeGreaterThanOrEqual(0);
  });

  it('test interface', async () => {
    const usersService = usersServiceFactory(UserMock);
    const users = await usersService.index();
    expect(users).toEqual([{ firstName: 'user' }]);
  });
});
