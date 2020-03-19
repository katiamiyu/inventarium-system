import { queryController } from '../helpers/db';
import checkId from '../helpers/general';

class itemController {
  static create(req, res) {
    const {
      itemName, itemDesc, initQty, isReturnable, availableQty,
    } = req.body;
    const queryString = {
      text:
        `INSERT INTO items(item_name, item_desc, init_quant, isreturnable, avail_quant, created_on) 
            VALUES ($1, $2, $3, $4, $5, to_timestamp($6 / 1000.0)) RETURNING *`,
      values: [itemName, itemDesc, initQty, isReturnable, availableQty, Date.now()],
    };
    queryController.dbQuery(res, queryString, 'items created successfully');
  }

  static getAll(req, res) {
    queryController.dbQuery(res, 'SELECT * FROM items', 'items retrieved successfully');
  }

  static getById(req, res) {
    const id = checkId(req.params.id);
    if (!id) return queryController.notFoundError(res, 'invalid id');
    const queryString = {
      text: 'SELECT * FROM items WHERE item_id = $1',
      values: [id],
    };
    queryController.dbQuery(res, queryString, 'item retrieved successfully', 'item not found');
  }

  static remove(req, res) {
    const id = checkId(req.params.id);
    if (!id) return queryController.notFoundError(res, 'invalid id');
    const query = {
      text: 'DELETE FROM items WHERE item_id = $1',
      values: [id],
    };
    queryController.dbQuery(res, query, 'item removed successfully', 'item not found');
  }
}

export default itemController;
