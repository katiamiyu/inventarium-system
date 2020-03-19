import itemValidations from '../validations/itemValidations';
import validator from '../middlewares/validation';
import itemController from '../controllers/itemController';

const routes = (app) => {
  app.post('/api/v1/items', itemValidations, validator.validatorError, itemController.create);
  app.get('/api/v1/items', itemController.getAll);
};

export default routes;
