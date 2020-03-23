import { check } from 'express-validator';

const requestValidations = [
  check('itemId', 'Item id is required')
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage('Item id is numeric')
    .trim()
    .escape(),
  check('empId', 'Employee id is required')
    .not()
    .isEmpty()
    .isNumeric()
    .withMessage('Employee Id can not be alphanumeric')
    .trim()
    .escape(),
  check('isReturnable', 'isReturnable is required')
    .not().isEmpty()
    .isBoolean()
    .withMessage('isReturnable accepts true or false values')
    .trim()
    .escape(),
];

export default requestValidations;
