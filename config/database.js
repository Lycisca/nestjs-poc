const fs = require('fs');

const config = {
  development: {
    dialect: "mssql",
    username: "root",
    password: "password",
    database: "database_development",
    host: process.env.DB_HOSTNAME || "127.0.0.1",
    port: 1433,
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
    dialect: "mssql",
    username: 'sa',
    password: 'h8t7-X9IAO',
    database: "database_test",
    host: process.env.DB_HOSTNAME || "127.0.0.1",
    dialectOptions: {
      encrypt: false,
    },
    port: 1433,
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
