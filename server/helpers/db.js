import conn from './conn';

const client = conn();
client.connect();

class queryController {
  /**
   *
   *  @param {String} errorMsg
   *  @param {Object} response
   *  @returns {Object} json
   */
  static notFoundError(response, errorMsg) {
    return response.status(200).json({
      status: 200,
      message: errorMsg,
      data: [],
    });
  }

  /**
   *  return message for non matching password in login or not found
   *  @param {Object} response
   *  @return {Object} json
   */
  static passwordFailureResponse(response, errorMsg) {
    return response.status(401).json({
      status: 401,
      error: errorMsg,
    });
  }

  /**
   *
   *  @param {String} successMsg
   *  @param {Object} response
   *  @param {String} status
   *  @param {Object} dbresult
   *  @returns {Object} json
   */
  static getSuccess(response, status, dbresult, successMsg) {
    return response.status(status).json({
      status,
      message: successMsg,
      data: dbresult.rows,
    });
  }

  /**
   *
   *  @param {String} successMsg
   *  @param {Object} response
   *  @param {String} status
   *  @param {Object} dbresult
   *  @returns {Object} json
   */
  static loginSuccessResponse(response, currentToken, data) {
    return response.status(200).json({
      status: 200,
      data: {
        id: data.user_id,
        userName: data.user_name,
        token: currentToken,
      },
    });
  }

  /**
   *
   * @param {Object} response
   * @param {String} error
   * @returns {Object} json
   */
  static serverError(response, error) {
    return response.status(500).json({
      status: 500,
      message: error,
    });
  }

  /**
   *
   * @param {Object} response
   * @param {Object} query
   * @param {String} message
   * @param {Object} notFound
   * @returns {Object} json
   */
  static dbQuery(response, query, message, notFound) {
    client
      .query(query)
      .then((result) => {
        if (result.rowCount === 0) {
          return queryController.notFoundError(response, notFound);
        }
        return queryController.getSuccess(response, 200, result, message);
      })
      .catch((error) => queryController.serverError(response, error));
  }
}

export { queryController, client };
