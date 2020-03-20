import { queryController } from '../helpers/db';

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
}

export default userController;
