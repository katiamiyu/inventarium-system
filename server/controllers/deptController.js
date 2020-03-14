import { queryController, client } from '../helpers/db';
import checkId  from '../helpers/general';

class deptController {
    static create(req, res) {
        const { deptName } = req.body;
        const queryString = {
          text:
            `INSERT INTO department(dept_name) 
            VALUES ($1) RETURNING *`,
          values: [deptName],
        };
        queryController.dbQuery(res, queryString, 'department created successfully', '');
      }
      static getAll(req, res) {
        queryController.dbQuery(res, 'SELECT * FROM department', 'department retrieved successfully', '');
      }
}

export default deptController;