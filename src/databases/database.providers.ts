import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Cat } from '../cats/cat.entity';
import DatabaseConfig from '../config/database';

const env = process.env.NODE_ENV || 'development';
export const sequelizeInit = () => {
  const databaseConfig = DatabaseConfig[env];
  const sequelize = new Sequelize(databaseConfig);
  sequelize.addModels([User, Cat]);
  // await sequelize.sync(); // Don't create tables to start application
  return sequelize;
};

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: () => sequelizeInit,
  },
];
