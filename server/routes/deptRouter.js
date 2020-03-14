import deptValidations from '../validations/deptValidations';
import validator from '../middlewares/validation';
import deptController from '../controllers/deptController';

const routes = (app) => {
  app.post('/api/v1/depts', deptValidations, validator.validatorError, deptController.create);
  app.get('/api/v1/depts', deptController.getAll);
  app.get('/api/v1/depts/:id', deptController.getById);
};

export default routes;