import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import DatabaseConfig from '../../config/database.js'

const env = process.env.NODE_ENV || 'development';
export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: () => {
      const databaseConfig = DatabaseConfig[env];
      const sequelize = new Sequelize(databaseConfig);
      sequelize.addModels([User]);
      // await sequelize.sync(); // Don't create tables to start application
      return sequelize;
    },
  },
];
