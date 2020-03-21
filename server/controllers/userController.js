import { queryController, client } from '../helpers/db';
import helper from '../helpers/general';

class userController {
  static create(req, res) {
    const {
      hint,
    } = req.body;
    let { password, userName, role } = req.body;
    role = role.toLowerCase();
    userName = helper.removeSpecialChar(userName);
    password = helper.hashPassword(password);
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
    const id = helper.checkId(req.params.id);
    if (!id) return queryController.notFoundError(res, 'invalid id');
    const queryString = {
      text: 'SELECT * FROM users WHERE user_id = $1',
      values: [id],
    };
    queryController.dbQuery(res, queryString, 'user retrieved successfully', 'user not found');
  }

  static signIn(req, res) {
    const userName = helper.removeSpecialChar(req.body.userName);
    const { password } = req.body;
    const findQuery = {
      text: 'SELECT * FROM users WHERE user_name = $1',
      values: [userName],
    };

    client.query(findQuery, (err, result) => {
      if (err) {
        queryController.serverError(res, 'Server error');
      }

      if (result.rowCount === 0 || !helper.comparePasswords(password, result.rows[0].password)) {
        return queryController.passwordFailureResponse(res, 'username or password is incorrect');
      }
      const token = helper.generateToken({ id: result.rows[0].user_id, role: result.rows[0].role });

      queryController.loginSuccessResponse(res, token, result.rows[0]);
    });
  }
}

export default userController;
