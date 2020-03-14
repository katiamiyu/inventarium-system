import { check } from 'express-validator';

const deptValidations = [
  check('deptName', 'Employee name is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
];

export default deptValidations;