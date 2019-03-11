import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table
export class Cat extends Model<Cat> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  // @BelongsTo(() => User, { onDelete: 'CASCADE' })
  // user: User;

  @BelongsTo(() => User)
  user: User;

  @Column
  name: string;

  @Column
  age: number;

  @Column
  user_id: number;

  @Column
  createdAt: Date;
}
