import { queryController } from '../helpers/db';

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
}

export default itemController;
