import reqValidations from '../validations/requestValidations';
import validator from '../middlewares/validation';
import reqController from '../controllers/requestController';

const routes = (app) => {
  app.post('/api/v1/requests', reqValidations, validator.validatorError, reqController.create);
  app.get('/api/v1/requests', reqController.getAll);
};

export default routes;
