import userValidations from '../validations/userValidations';
import validator from '../middlewares/validation';
import userController from '../controllers/userController';
import authenticateUser from '../middlewares/authenticateUser';

const routes = (app) => {
  app.post('/api/v1/auth/signup', authenticateUser.authenticateAdmin, userValidations, validator.validatorError, userController.create);
  app.get('/api/v1/users', authenticateUser.authenticateAdmin, userController.getAll);
  app.get('/api/v1/user/:id', authenticateUser.authenticateAdmin, userController.getById);
  app.post('/api/v1/auth/signin', userController.signIn);
};

export default routes;
