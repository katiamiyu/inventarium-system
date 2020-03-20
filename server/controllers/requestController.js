import { queryController, client } from '../helpers/db';
import checkId from '../helpers/general';

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
}

export default RequestController;
