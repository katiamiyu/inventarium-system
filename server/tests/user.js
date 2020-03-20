import request from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
describe('Test on user endpoints', () => {
  describe('Create user endpoint', () => {
    // create user
    it('should create user record', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: 'crystalwebpro',
          role: 'Admin',
          password: 'testing@5',
          hint: 'test',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('user created successfully');
          done();
        });
    });
    // check for user name
    it('should check for user name', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: '',
          role: 'Admin',
          password: 'testing@5',
          hint: 'test',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('user name is required');
          done();
        });
    });
    // check for user role
    it('should check for user role', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: 'crystalwebpro',
          role: '',
          password: 'testing@5',
          hint: 'test',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('role is required');
          done();
        });
    });
    // check for user password
    it('should check for user password', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: 'crystalwebpro',
          role: 'Admin',
          password: '',
          hint: 'test',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('password is required');
          done();
        });
    });
    // check for user password hint
    it('should check for user password hint', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .send({
          userName: 'crystalwebpro',
          role: 'Admin',
          password: 'testing@123',
          hint: '',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('password hint is required');
          done();
        });
    });
    // end of create user end-point.
  });
  describe('Get all users endpoint', () => {
    // get all users
    it('should retrieve all users', (done) => {
      request(app)
        .get('/api/v1/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('users retrieved successfully');
          done();
        });
    });
    // end of get all users end-point
  });
  describe('Get user by id endpoint', () => {
    // get user by id
    it('should retrieve user by id', (done) => {
      request(app)
        .get('/api/v1/user/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('user retrieved successfully');
          done();
        });
    });
    it('should check for valid item id', (done) => {
      request(app)
        .get('/api/v1/user/one')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('invalid id');
          done();
        });
    });
    // end of get user by id end-point
  });
});
