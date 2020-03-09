import dotenv from 'dotenv';

dotenv.config();

export default {
  test: {
    dbTestUrl: process.env.DB_TEST_URL,
  },
  development: {
    dbUrl: process.env.DB_URL,
  },
  production: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
