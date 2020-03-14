import request from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
describe('Test on department endpoints', () => {
  describe('Create departments endpoint', () => {
    // create department
    it('should create department record', (done) => {
      request(app)
        .post('/api/v1/depts')
        .send({
          deptName: 'Admin',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('department created successfully');
          done();
        });
    });
    // check for emp name
    it('should check for department name', (done) => {
      request(app)
        .post('/api/v1/depts')
        .send({
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('department name is required');
          done();
        });
    });
    // end of create department end-point.
  });

});