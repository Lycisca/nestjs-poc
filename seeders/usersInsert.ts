import UserModel from '../src/users/user.entity';

let count = 10;
while (count > 0) {
  UserModel.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
  count = count - 1
}
