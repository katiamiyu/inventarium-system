import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @class Authenticate User
 */
class authenticateUser {
  /**
     * check isAdmin
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     * @return {Object}
     */
  static authenticateAdmin(req, res, next) {
    try {
      const token = req.headers['x-access'] || req.headers.token || req.query.token;
      const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
      req.token = verifiedToken;

      if (verifiedToken.user.role !== 'admin') {
        return res.status(403).json({
          status: 403,
          error: 'unAuthorised user',
        });
      } return next();
    } catch (error) {
      return res.status(401).json({
        status: 401,
        error: 'not authenticated',
      });
    }
  }
}

export default authenticateUser;
