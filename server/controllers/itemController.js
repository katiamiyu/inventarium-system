import { queryController, client } from '../helpers/db';
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

  static edit(req, res) {
    const id = checkId(req.params.id);
    if (!id) return queryController.notFoundError(res, 'invalid id');
    const findQuery = {
      text: 'SELECT * FROM items WHERE item_id = $1',
      values: [id],
    };
    client.query(findQuery, (err, result) => {
      if (err) {
        return queryController.serverError(res, 'Server error');
      }
      if (result.rowCount === 0) {
        return queryController.notFoundError(res, 'item not found');
      }
      const { rows } = result;
      const updateQuery = {
        text: `UPDATE items SET item_name = $1, item_desc = $2, init_quant = $3, isreturnable = $4,
         avail_quant = $5, updated_on = to_timestamp($6 / 1000.0) WHERE item_id = $7 RETURNING *`,
        values: [
          req.body.itemName || rows[0].item_name, req.body.itemDesc || rows[0].item_desc,
          req.body.initQty || rows[0].init_quant, req.body.isReturnable || rows[0].isreturnable,
          req.body.availableQty || rows[0].avail_quant, Date.now(), id,
        ],
      };
      queryController.dbQuery(res, updateQuery, 'item updated successfully');
    });
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
