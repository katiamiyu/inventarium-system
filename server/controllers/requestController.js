import { queryController, client } from '../helpers/db';

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
}

export default RequestController;
