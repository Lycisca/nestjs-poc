/* tslint:disable */
// import fs from 'fs';
// import {
//   ISequelizeConfig
// } from 'sequelize-typescript';

// interface DatabaseConfig {
//   development: ISequelizeConfig;
//   test: ISequelizeConfig;
//   production: ISequelizeConfig;
// }
const fs = require('fs');

const config = {
  development: {
    dialect: "mysql",
    username: "root",
    password: "password",
    database: "database_development",
    host: process.env.DB_HOSTNAME || "127.0.0.1",
    port: 3306,
    define: {
      // underscored: false
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: true
    }
  },
  test: {
    dialect: "sqlite",
    // the storage engine for sqlite
    // - default ':memory:'
    storage: 'db/database.sqlite',
    define: {
      // underscored: false
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: true
    }
  },
  production: {
    dialect: "mysql",
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    port: 3306,
    define: {
      // underscored: false
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: true
    }
  }
}
module.exports = config

module.exports.default = config
