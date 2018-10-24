import { UsersService } from './users.service';
import { databaseProviders } from '../databases/database.providers';
import { User } from './user.entity';

const usersServiceFactory = (UserRepository = User) => {
  databaseProviders[0].useFactory();
  return new UsersService(UserRepository);
};

describe('Users Service', () => {
  it('test database index query', async () => {
    const usersService = usersServiceFactory();
    const users = await usersService.index()
    expect(users).toBeInstanceOf(Array);
  });
});
