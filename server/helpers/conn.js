import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();
const connection = () => {
  let config;

  if (process.env.NODE_ENV === 'test') {
    config = process.env.DATABASE_URL;
  } else if (process.env.NODE_ENV === 'production') {
    config = process.env.DATABASE_URL;
  } else {
    config = process.env.DATABASE_URL;
  }

  const client = new Client(config);
  return client;
};


export default connection;
