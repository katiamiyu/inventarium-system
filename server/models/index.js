// fuction to run the queries
import createQuery from './tables.create';
import destroyQuery from './db.destroy';
import connection from '../helpers/conn';
import helper from '../helpers/general';

const client = connection();
client.connect();
const adminPassword = helper.hashPassword('testing@5234');

const adminQuery = `INSERT INTO users(user_name, role, password, hint) VALUES 
('singlecliq', 'admin', '${adminPassword}', 'test') RETURNING *;`;

const dbQueries = `${destroyQuery}${createQuery}${adminQuery}`;

client.query(dbQueries, (err, res) => {
  client.end();
});
