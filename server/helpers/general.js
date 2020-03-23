import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config();

/**
* function to check id
* @param {integer} id
* @returns {integer} checkId
 */
const checkId = (id) => {
  const newId = parseInt(id, 10);
  return isNaN(newId) ? 0 : newId;
};
/**
* function to remove special character
* @param {string} str
* @returns {string} removeSpecialChar
 */
const removeSpecialChar = (str) => str.replace(/[^A-Z0-9]/ig, '');
/**
* function to generate token
* @param {Object} userObject
* @returns {Object} generateToken
 */
const generateToken = (userObject) => jwt.sign({ user: userObject },
  process.env.SECRET_KEY,
  {
    expiresIn: 8400,
  });

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const comparePasswords = (userPassword, hashedPassword) => {
  return bcrypt.compareSync(userPassword, hashedPassword);
};

export default {
  checkId, generateToken, hashPassword, comparePasswords, removeSpecialChar,
};
