import userValidations from '../validations/userValidations';
import validator from '../middlewares/validation';
import userController from '../controllers/userController';

const routes = (app) => {
  app.post('/api/v1/auth/signup', userValidations, validator.validatorError, userController.create);
  app.get('/api/v1/users', userController.getAll);
  app.get('/api/v1/user/:id', userController.getById);
  app.post('/api/v1/auth/signin', userController.signIn);
};

export default routes;
