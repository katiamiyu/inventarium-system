import request from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
describe('Test on employee endpoints', () => {
  describe('Create employees endpoint', () => {
    // create employee
    it('should create employee record', (done) => {
      request(app)
        .post('/api/v1/employees')
        .send({
          empName: 'kazeem tiamiyu',
          mobile: '8177221305',
          deptId: 6,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('employee created successfully');
          done();
        });
    });
    // end of create end point.
  });
});
