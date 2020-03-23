import { queryController, client } from '../helpers/db';
import helper from '../helpers/general';

class EmpController {
  static create(req, res) {
    const { empName, mobile, deptId } = req.body;
    const queryString = {
      text:
        `INSERT INTO employees(emp_name, mobile, dept_id) 
        VALUES ($1, $2, $3) RETURNING *`,
      values: [empName, mobile, deptId],
    };
    queryController.dbQuery(res, queryString, 'employee created successfully', '');
  }

  static getAll(req, res) {
    queryController.dbQuery(res, 'SELECT * FROM employees', 'employees retrieved successfully', '');
  }

  static getById(req, res) {
    const id = helper.checkId(req.params.id);
    if (id === 0) return queryController.notFoundError(res, 'invalid id');
    const queryString = {
      text: 'SELECT * FROM employees WHERE emp_id = $1',
      values: [id],
    };
    queryController.dbQuery(res, queryString, 'employee(s) retrieved successfully', 'employee not found');
  }

  static edit(req, res) {
    const id = helper.checkId(req.params.id);
    if (id === 0) return queryController.notFoundError(res, 'invalid id');
    const findQuery = {
      text: 'SELECT * FROM employees WHERE emp_id = $1',
      values: [id],
    };
    client.query(findQuery, (err, result) => {
      if (err) {
        return queryController.serverError(res, err);
      }
      if (result.rowCount === 0) {
        return queryController.notFoundError(res, 'employee not found');
      }
      const { rows } = result;
      const updateQuery = {
        text: 'UPDATE employees SET emp_name = $1, mobile = $2, dept_id = $3 WHERE emp_id = $4 RETURNING *',
        values: [
          req.body.empName || rows[0].emp_name, req.body.mobile || rows[0].mobile,
          req.body.deptId || rows[0].dept_id, id,
        ],
      };
      queryController.dbQuery(res, updateQuery, 'employee updated successfully');
    });
  }

  static remove(req, res) {
    const id = helper.checkId(req.params.id);
    if (id === 0) return queryController.notFoundError(res, 'invalid id');
    const query = {
      text: 'DELETE FROM employees WHERE emp_id = $1',
      values: [id],
    };
    queryController.dbQuery(res, query, 'employee removed successfully', 'employee not found');
  }
}

export default EmpController;
