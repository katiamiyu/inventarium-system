import { check } from 'express-validator';

const userValidations = [
  check('userName', 'user name is required')
    .not()
    .isEmpty()
    .trim(),
  check('role', 'role is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
  check('password')
    .exists()
    .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character')
    .isLength({ min: 8 })
    .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/)
    .withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character'),
  check('hint', 'password hint is required')
    .not()
    .isEmpty()
    .trim()
    .escape(),
];

export default userValidations;