import { validationResult } from 'express-validator';

/**
 *    @fileOverview Class to validate request
 *    @class Validator
 *    @exports Validator
 */
class Validator {
  /**
   * validate if request has errors
   * @param {Object} request
   * @param {Object} response
   * @callback {Function} next
   * @return {String} errors
   */

  static validatorError(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}
export default Validator;