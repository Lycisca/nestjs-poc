// User.create({
//   firstName: 'John',
//   lastName: 'Hancock'
// });
import UserModel from './users/user.entity';

UserModel.findAll().then(users => {
  console.log(users.map(u => u.firstName))
})

console.log("Hello world")
// npx ts-node -r tsconfig-paths/register src/example.ts
