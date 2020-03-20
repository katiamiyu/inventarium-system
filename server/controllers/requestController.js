import { queryController, client } from '../helpers/db';
import checkId from '../helpers/general';
import today from '../helpers/today';

class RequestController {
  static create(req, res) {
    const {
      itemId, empId, isReturnable, status,
    } = req.body;
    const queryString = {
      text:
        `INSERT INTO requests(item_id, emp_id, isreturnable, status) 
        VALUES ($1, $2, $3, $4) RETURNING *`,
      values: [itemId, empId, isReturnable, status],
    };
    queryController.dbQuery(res, queryString, 'request placed successfully', '');
  }

  static getAll(req, res) {
    queryController.dbQuery(res, 'SELECT * FROM requests', 'requests retrieved successfully', '');
  }

  static getById(req, res) {
    const id = checkId(req.params.id);
    if (id === 0) return queryController.notFoundError(res, 'invalid id');
    const queryString = {
      text: 'SELECT * FROM requests WHERE req_id = $1',
      values: [id],
    };
    queryController.dbQuery(res, queryString, 'request retrieved successfully', 'request not found');
  }

  static edit(req, res) {
    const id = checkId(req.params.id);
    if (id === 0) return queryController.notFoundError(res, 'invalid id');
    const findQuery = {
      text: 'SELECT * FROM requests WHERE req_id = $1',
      values: [id],
    };
    client.query(findQuery, (err, result) => {
      if (err) {
        return queryController.serverError(res, err);
      }
      if (result.rowCount === 0) {
        return queryController.notFoundError(res, 'request not found');
      }
      const { rows } = result;
      const updatedOn = today();
      const updateQuery = {
        text: 'UPDATE requests SET item_id = $1, emp_id = $2, isreturnable = $3, status = $4, updated_on = $5 WHERE req_id = $6 RETURNING *',
        values: [
          req.body.itemId || rows[0].item_id, req.body.empId || rows[0].emp_id,
          req.body.isReturnable || rows[0].isreturnable, req.body.status || rows[0].status,
          updatedOn, id,
        ],
      };
      queryController.dbQuery(res, updateQuery, 'request updated successfully');
    });
  }

  static remove(req, res) {
    const id = checkId(req.params.id);
    if (!id) return queryController.notFoundError(res, 'invalid id');
    const query = {
      text: 'DELETE FROM requests WHERE req_id = $1',
      values: [id],
    };
    queryController.dbQuery(res, query, 'request removed successfully', 'request not found');
  }
}

export default RequestController;
