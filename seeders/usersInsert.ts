import User from '../src/users/user.entity';

let count = 10;
while (count > 0) {
  User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
  count = count - 1
}
