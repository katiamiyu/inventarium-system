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
      static getById(req, res) {
        const id = checkId(req.params.id);
        if (id === 0) return queryController.notFoundError(res, 'invalid id');
        const queryString = {
          text: 'SELECT * FROM department WHERE dept_id = $1',
          values: [id],
        };
        queryController.dbQuery(res, queryString, 'department retrieved successfully', 'department not found');
      }

      static remove(req, res) {
        const id = checkId(req);
        if (id === 0) return queryController.notFoundError(res, 'invalid id');
        const query = {
          text: 'DELETE FROM department WHERE dept_id = $1',
          values: [id],
        };
        queryController.dbQuery(res, query, 'department removed successfully', 'department not found');
      }
}

export default deptController;