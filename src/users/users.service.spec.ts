import { IFindOptions, Model } from 'sequelize-typescript';
import { UsersService } from './users.service';
import { databaseProviders } from '../databases/database.providers';
import { User } from './user.entity';

class UserMock extends User {
  static findAll<T extends Model<T>> (this: (new () => T), options?: IFindOptions<T>): any {
    return [{firstName: "user"}]
  }
}

const usersServiceFactory = (UserRepository) => {
  databaseProviders[0].useFactory();
  return new UsersService(UserRepository);
};

describe('Users Service', () => {
  it('test database index query', async () => {
    const usersService = usersServiceFactory(User);
    const users = await usersService.index()
    expect(users).toBeInstanceOf(Array);
  });

  it('test interface', async () => {
    const repo: typeof User = UserMock
    const usersService = usersServiceFactory(repo);
    const users = await usersService.index()
    expect(users).toEqual([{firstName: "user"}]);
  });

});
