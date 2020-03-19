import Express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import empRoutes from './server/routes/empRouter';
import deptRoutes from './server/routes/deptRouter';
import itemRoutes from './server/routes/itemRouter';

dotenv.config();

// declare constants
const app = new Express();
const port = process.env.PORT;


app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());


empRoutes(app);
deptRoutes(app);
itemRoutes(app);

// declare 404 route
app.all('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'The URL you are trying to access does not exist. Please enter a valid url',
}));

// listen to app port
app.listen(port, () => console.log(`App listening on port ${port}`));

export default app;
