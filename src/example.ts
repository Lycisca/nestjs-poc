import UserModel from './users/user.entity';

UserModel.findAll().then(users => {
  console.log(users.map(u => u.firstName))
})

console.log("Hello world")
// npx ts-node src/example.ts
