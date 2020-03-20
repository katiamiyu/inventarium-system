import request from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
describe('Test on request endpoints', () => {
  describe('Create requests endpoint', () => {
    // place a request
    it('should place a request', (done) => {
      request(app)
        .post('/api/v1/requests')
        .send({
          itemId: 1,
          empId: 1,
          isReturnable: true,
          status: 'available',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('request placed successfully');
          done();
        });
    });
    // check for item id
    it('should check for item id', (done) => {
      request(app)
        .post('/api/v1/requests')
        .send({
          empId: 1,
          isReturnable: true,
          status: 'available',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Item id is required');
          done();
        });
    });
    // check item id is numeric
    it('should check if item id is numeric', (done) => {
      request(app)
        .post('/api/v1/requests')
        .send({
          itemId: 'one',
          empId: 1,
          isReturnable: true,
          status: 'available',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Item id is numeric');
          done();
        });
    });
  }); // end of create request endpoint
  describe('Get all requests endpoint', () => {
    it('should retrieve all available requests', (done) => {
      request(app)
        .get('/api/v1/requests')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('requests retrieved successfully');
          done();
        });
    });
    it('should retrieve requests by id', (done) => {
      request(app)
        .get('/api/v1/requests/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('request retrieved successfully');
          done();
        });
    });
    it('should check for valid request id', (done) => {
      request(app)
        .get('/api/v1/requests/one')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('invalid id');
          done();
        });
    });
    it('should check if request exists', (done) => {
      request(app)
        .get('/api/v1/requests/100')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('request not found');
          done();
        });
    });
  }); // end of get all employees end-point
  describe('Update requests endpoint', () => {
    // update a request
    it('should update a request', (done) => {
      request(app)
        .put('/api/v1/requests/1')
        .send({
          itemId: 1,
          empId: 1,
          isReturnable: false,
          status: 'availables',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('request updated successfully');
          done();
        });
    });
    // check for valid id
    it('should check for valid request id', (done) => {
      request(app)
        .put('/api/v1/requests/one')
        .send({
          itemId: 1,
          empId: 1,
          isReturnable: true,
          status: 'availabless',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('invalid id');
          done();
        });
    });
    // check for item id
    it('should check for item id', (done) => {
      request(app)
        .put('/api/v1/requests/1')
        .send({
          empId: 1,
          isReturnable: true,
          status: 'available',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Item id is required');
          done();
        });
    });
    // check item id is numeric
    it('should check if item id is numeric', (done) => {
      request(app)
        .put('/api/v1/requests/1')
        .send({
          itemId: 'one',
          empId: 1,
          isReturnable: true,
          status: 'available',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Item id is numeric');
          done();
        });
    });
    it('should check if request exists', (done) => {
      request(app)
        .put('/api/v1/requests/100')
        .send({
          itemId: 1,
          empId: 1,
          isReturnable: true,
          status: 'available',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('request not found');
          done();
        });
    });
  });
  describe('Remove requests endpoint', () => {
    it('should check if request exists', (done) => {
      request(app)
        .delete('/api/v1/requests/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('request removed successfully');
          done();
        });
    });
    it('should check if request exists', (done) => {
      request(app)
        .delete('/api/v1/requests/100')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('request not found');
          done();
        });
    });
  });
});
