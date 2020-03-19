import itemValidations from '../validations/itemValidations';
import validator from '../middlewares/validation';
import itemController from '../controllers/itemController';

const routes = (app) => {
  app.post('/api/v1/items', itemValidations, validator.validatorError, itemController.create);
};

export default routes;
