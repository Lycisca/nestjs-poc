const fs = require('fs');

module.exports = {
  development: {
    dialect: "mysql",
    username: "root",
    password: "password",
    database: "database_development",
    host: process.env.DB_HOSTNAME || "127.0.0.1",
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
    dialect: "mysql",
    username: "root",
    password: "password",
    database: "database_test",
    host: process.env.DB_HOSTNAME || "127.0.0.1",
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
