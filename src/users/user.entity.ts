import { Table, Column, Model, HasOne, HasMany } from 'sequelize-typescript';
import sequelize = require('sequelize');
import { Cat } from '../cats/cat.entity';

@Table
export class User extends Model<User> {
  // @HasOne(() => Cat)
  // cat: Cat;

  @HasMany(() => Cat)
  cats: Cat[];

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
