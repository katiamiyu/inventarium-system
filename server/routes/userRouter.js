import userValidations from '../validations/userValidations';
import validator from '../middlewares/validation';
import userController from '../controllers/userController';

const routes = (app) => {
  app.post('/api/v1/auth/signup', userValidations, validator.validatorError, userController.create);
};

export default routes;
