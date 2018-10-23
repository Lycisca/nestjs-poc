// import { Table, Column, Model } from 'sequelize-typescript';

// @Table
// export class User extends Model<User> {
//   @Column
//   name: string;

//   @Column
//   age: number;

// }
import Sequelize from 'sequelize';
import { sequelize } from '../database.providers';

const UserModel = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

export default UserModel;
