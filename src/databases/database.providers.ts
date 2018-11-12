import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Cat } from '../cats/cat.entity';
import DatabaseConfig from '../config/database';

const env = process.env.NODE_ENV || 'development';
export const sequelizeInit = async () => {
  const databaseConfig = DatabaseConfig[env];
  const sequelize = new Sequelize(databaseConfig);
  sequelize.addModels([User, Cat]);
  if (env == 'test') await sequelize.sync();
  return sequelize;
};

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: () => sequelizeInit(),
  },
];
