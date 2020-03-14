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
}

export default deptController;