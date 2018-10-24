const fs = require('fs');

module.exports = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "database_development",
    "host": process.env.DB_HOSTNAME || "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": "password",
    "database": "database_test",
    "host": process.env.DB_HOSTNAME || "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    "dialect": "mysql"
  }
}
