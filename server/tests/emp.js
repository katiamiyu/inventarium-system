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
    // check for emp name
    it('should check for employee name', (done) => {
      request(app)
        .post('/api/v1/employees')
        .send({
          mobile: '8177221305',
          deptId: 6,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Employee name is required');
          done();
        });
    });
    // check for emp mobile
    it('should check for employee mobile', (done) => {
      request(app)
        .post('/api/v1/employees')
        .send({
          empName: 'kazeem tiamiyu',
          deptId: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Mobile is required');
          done();
        });
    });
    // check if mobile is a number
    it('should check for employee mobile', (done) => {
      request(app)
        .post('/api/v1/employees')
        .send({
          empName: 'kazeem tiamiyu',
          mobile: '8177errf',
          deptId: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Mobile can not be alphanumeric');
          done();
        });
    });
    // check for department id
    it('should check for employees department', (done) => {
      request(app)
        .post('/api/v1/employees')
        .send({
          empName: 'kazeem tiamiyu',
          mobile: '8177221305',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Department id is required');
          done();
        });
    });
    // check if department id is a number
    it('should check for employee mobile', (done) => {
      request(app)
        .post('/api/v1/employees')
        .send({
          empName: 'kazeem tiamiyu',
          mobile: '8177221305',
          deptId: 'llkl',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Mobile should be a number');
          done();
        });
    });
    // end of create employee end-point.
  });
  describe('Get all employees endpoint', () => {
    it('should retrieve all available employees', (done) => {
      request(app)
        .get('/api/v1/employees')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('employees retrieved successfully');
          done();
        });
    });
    // end of get all employees end-point
  });
});
