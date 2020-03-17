import { queryController, client } from '../helpers/db';
import checkId from '../helpers/general';

class deptController {
  static create(req, res) {
    const { deptName } = req.body;
    const queryString = {
      text:
        `INSERT INTO department(dept_name) 
            VALUES ($1) RETURNING *`,
      values: [deptName],
    };
    queryController.dbQuery(res, queryString, 'department created successfully');
  }

  static getAll(req, res) {
    queryController.dbQuery(res, 'SELECT * FROM department', 'department retrieved successfully', '');
  }

  static getById(req, res) {
    const id = checkId(req.params.id);
    if (!id) return queryController.notFoundError(res, 'invalid id');
    const queryString = {
      text: 'SELECT * FROM department WHERE dept_id = $1',
      values: [id],
    };
    queryController.dbQuery(res, queryString, 'department retrieved successfully', 'department not found');
  }

  static edit(req, res) {
    const id = checkId(req.params.id);
    if (!id) return queryController.notFoundError(res, 'invalid id');
    const findQuery = {
      text: 'SELECT * FROM department WHERE dept_id = $1',
      values: [id],
    };
    client.query(findQuery, (err, result) => {
      if (err) {
        return queryController.serverError(res, 'Server error');
      }
      if (result.rowCount === 0) {
        return queryController.notFoundError(res, 'department not found');
      }
      const { rows } = result;
      const updateQuery = {
        text: 'UPDATE department SET dept_name = $1 WHERE dept_id = $2 RETURNING *',
        values: [
          req.body.deptName || rows[0].dept_name,
          id,
        ],
      };
      queryController.dbQuery(res, updateQuery, 'department updated successfully');
    });
  }

  static remove(req, res) {
    const id = checkId(req.params.id);
    if (!id) return queryController.notFoundError(res, 'invalid id');
    const query = {
      text: 'DELETE FROM department WHERE dept_id = $1',
      values: [id],
    };
    queryController.dbQuery(res, query, 'department removed successfully', 'department not found');
  }
}

export default deptController;
