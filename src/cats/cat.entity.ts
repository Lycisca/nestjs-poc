import { Table, Column, Model } from 'sequelize-typescript';
import { CatsInterface } from './cats.interface';

@Table
export class Cat extends Model<Cat> {
  @Column
  name: string;

  @Column
  age: number;

  @Column
  user_id: number;

  @Column
  createdAt: Date;
}

export const catsProviders = [
  {
    provide: 'CatsRepository',
    useValue: Cat,
  },
];
