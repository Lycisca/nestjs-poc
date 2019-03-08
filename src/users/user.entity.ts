import { Table, Column, Model } from 'sequelize-typescript';
import sequelize = require('sequelize');

@Table
export class User extends Model<User> {
  @Column
  email: string;

  @Column
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  createdAt: Date;

  @Column
  updateAt: Date;
}
