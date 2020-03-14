import { check } from 'express-validator';

const deptValidations = [
  check('deptName', 'department name is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
];

export default deptValidations;