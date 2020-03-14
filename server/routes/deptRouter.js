import deptValidations from '../validations/deptValidations';
import validator from '../middlewares/validation';
import deptController from '../controllers/deptController';

const routes = (app) => {
  app.post('/api/v1/depts', deptValidations, validator.validatorError, deptController.create);
};

export default routes;