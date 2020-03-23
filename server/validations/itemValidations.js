import { check } from 'express-validator';

const itemValidations = [
  check('itemName', 'Item name is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('itemDesc', 'Item description is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('initQty', 'Initial quantity is required')
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage('Initial quantity should be a number'),
  check('isReturnable', 'isReturnable is required')
    .not().isEmpty()
    .isBoolean()
    .withMessage('isReturnable should be a boolean value'),
  check('availableQty', 'available quantity is required')
    .not().isEmpty()
    .isNumeric()
    .withMessage('available quantity should be a number'),
];

export default itemValidations;
