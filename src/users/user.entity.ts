import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class UserModel extends Model<UserModel> {
  @Column
  firstName: string;

  @Column
  lastName: number;
}
