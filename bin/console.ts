import { UsersService } from '../src/users/users.service';
import { databaseProviders } from '../src/databases/database.providers';
import { User } from '../src/users/user.entity';

const sequelize = databaseProviders[0].useFactory()
const usersService = new UsersService(User)
usersService.index().then(users => {
  console.log(users)
})
