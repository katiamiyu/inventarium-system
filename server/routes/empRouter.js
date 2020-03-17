import empValidations from '../validations/empValidations';
import validator from '../middlewares/validation';
import empController from '../controllers/empController';

const routes = (app) => {
  app.post('/api/v1/employees', empValidations, validator.validatorError, empController.create);
  app.get('/api/v1/employees', empController.getAll);
  app.get('/api/v1/employees/:id', empController.getById);
  app.put('/api/v1/employees/:id', empValidations, validator.validatorError, empController.edit);
  app.delete('/api/v1/employees/:id', empController.remove);
};

export default routes;
