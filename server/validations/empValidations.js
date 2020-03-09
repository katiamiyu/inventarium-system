import { check } from 'express-validator';

const empValidations = [
  check('empName', 'Employee name is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('mobile', 'Mobile is required')
    .not()
    .isEmpty()
    .isMobilePhone()
    .withMessage('Mobile can not be alphanumeric')
    .not()
    .trim()
    .escape(),
  check('deptId', 'Department id is required')
    .not().isEmpty()
    .isNumeric()
    .withMessage('Should be a number')
    .trim()
    .escape(),
];

export default empValidations;
