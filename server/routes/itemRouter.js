import itemValidations from '../validations/itemValidations';
import validator from '../middlewares/validation';
import itemController from '../controllers/itemController';

const routes = (app) => {
  app.post('/api/v1/items', itemValidations, validator.validatorError, itemController.create);
  app.get('/api/v1/items', itemController.getAll);
  app.get('/api/v1/items/:id', itemController.getById);
  app.put('/api/v1/items/:id', itemValidations, validator.validatorError, itemController.edit);
  app.delete('/api/v1/items/:id', itemController.remove);
};

export default routes;
