require('dotenv').config();

const dbConfig = {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
  ssl: true
};

module.exports = {
  development: dbConfig,
  staging: dbConfig,
  test: dbConfig,
  production: dbConfig,
};
