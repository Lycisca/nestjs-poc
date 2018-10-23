import { UserModel } from './user.entity';

export const usersProviders = [
  {
    provide: 'UsersRepository',
    useValue: UserModel,
  },
];
