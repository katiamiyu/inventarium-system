import request from 'supertest';
import chai from 'chai';
import app from '../../app';

let currrentToken;
const { expect } = chai;

describe('Test on user endpoints', () => {
  describe('Create user endpoint', () => {
    before((done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          userName: 'singlecliq',
          password: 'testing@5234',
        })
        .end((error, res) => {
          currrentToken = res.body.data.token;
          done();
        });
    });
    // create user
    it('should create user record', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('token', currrentToken)
        .send({
          userName: 'crystalwebpro',
          role: 'normal',
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
        .set('token', currrentToken)
        .send({
          userName: '',
          role: 'normal',
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
        .set('token', currrentToken)
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
        .set('token', currrentToken)
        .send({
          userName: 'crystalwebpro',
          role: 'normal',
          password: '',
          hint: 'test',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Password should not be empty, minimum eight characters, at least one letter, one number and one special character');
          done();
        });
    });
    // check for user password hint
    it('should check for user password hint', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('token', currrentToken)
        .send({
          userName: 'crystalwebpro',
          role: 'normal',
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
        .set('token', currrentToken)
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
        .set('token', currrentToken)
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
        .set('token', currrentToken)
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
  describe('SignIn user endpoint', () => {
    // SignIn user endpoint
    it('it should not signin a user with incorrect info', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          userName: 'crystalwebpro',
          password: 'testing@51',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.error).to.equal('username or password is incorrect');
          done();
        });
    });
    it('it should signin a user with correct and complete information', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .send({
          userName: 'crystalwebpro',
          password: 'testing@5',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.data.userName).to.equal('crystalwebpro');
          done();
        });
    });
    // end of signin user end-point.
  });
});
