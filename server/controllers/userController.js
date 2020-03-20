import { queryController } from '../helpers/db';
import checkId from '../helpers/general';

class userController {
  static create(req, res) {
    const {
      userName, role, password, hint,
    } = req.body;
    const queryString = {
      text:
        `INSERT INTO users(user_name, role, password, hint, created_on) 
            VALUES ($1, $2, $3, $4, to_timestamp($5 / 1000.0)) RETURNING *`,
      values: [userName, role, password, hint, Date.now()],
    };
    queryController.dbQuery(res, queryString, 'user created successfully');
  }

  static getAll(req, res) {
    queryController.dbQuery(res, 'SELECT * FROM users', 'users retrieved successfully', '');
  }

  static getById(req, res) {
    const id = checkId(req.params.id);
    if (!id) return queryController.notFoundError(res, 'invalid id');
    const queryString = {
      text: 'SELECT * FROM users WHERE user_id = $1',
      values: [id],
    };
    queryController.dbQuery(res, queryString, 'user retrieved successfully', 'user not found');
  }
}

export default userController;
