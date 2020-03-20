import { check } from 'express-validator';

const userValidations = [
  check('userName', 'user name is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('role', 'role is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('password', 'password is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('hint', 'password hint is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
];

export default userValidations;
