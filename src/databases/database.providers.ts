import { Sequelize } from 'sequelize-typescript';
import { UserModel } from '../users/user.entity';
// import config from '../config/config.json';

const env = process.env.NODE_ENV || 'development';
export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'password',
        database: 'database_development',
      });
      sequelize.addModels([UserModel]);
      await sequelize.sync();
      return sequelize;
    },
  },
];


