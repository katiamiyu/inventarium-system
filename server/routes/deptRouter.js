import deptValidations from '../validations/deptValidations';
import validator from '../middlewares/validation';
import deptController from '../controllers/deptController';

const routes = (app) => {
  app.post('/api/v1/depts', deptValidations, validator.validatorError, deptController.create);
  app.get('/api/v1/depts', deptController.getAll);
  app.get('/api/v1/depts/:id', deptController.getById);
  app.put('/api/v1/depts/:id', deptValidations, validator.validatorError, deptController.edit);
  app.delete('/api/v1/depts/:id', deptController.remove);
};

export default routes;
