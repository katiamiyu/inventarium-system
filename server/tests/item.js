import request from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
describe('Test on items endpoints', () => {
  describe('Create items endpoint', () => {
    // create department
    it('should create item record', (done) => {
      request(app)
        .post('/api/v1/items')
        .send({
          itemName: 'Pen',
          itemDesc: 'A nice pen',
          initQty: 5,
          isReturnable: true,
          availableQty: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('items created successfully');
          done();
        });
    });
    // check for item name
    it('should check for item name', (done) => {
      request(app)
        .post('/api/v1/items')
        .send({
          itemDesc: 'A nice pen',
          initQty: 5,
          isReturnable: true,
          availableQty: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Item name is required');
          done();
        });
    });
    // check for item description
    it('should check for item description', (done) => {
      request(app)
        .post('/api/v1/items')
        .send({
          itemName: 'Pen',
          itemDesc: '',
          initQty: 5,
          isReturnable: true,
          availableQty: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Item description is required');
          done();
        });
    });
    // check for item initial quantity
    it('should check for item initial quantity', (done) => {
      request(app)
        .post('/api/v1/items')
        .send({
          itemName: 'Pen',
          itemDesc: 'A nice pen',
          isReturnable: true,
          availableQty: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Initial quantity is required');
          done();
        });
    });
    // check for invalid item initial quantity
    it('should check for invalid item initial quantity', (done) => {
      request(app)
        .post('/api/v1/items')
        .send({
          itemName: 'Pen',
          itemDesc: 'A nice pen',
          initQty: 'll',
          isReturnable: true,
          availableQty: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('Initial quantity should be a number');
          done();
        });
    });
    // check for item returnable field
    it('should check for item returnable field', (done) => {
      request(app)
        .post('/api/v1/items')
        .send({
          itemName: 'Pen',
          itemDesc: 'A nice pen',
          initQty: 5,
          availableQty: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('isReturnable is required');
          done();
        });
    });
    // check for item initial quantity
    it('should check for item returnable field value is valid', (done) => {
      request(app)
        .post('/api/v1/items')
        .send({
          itemName: 'Pen',
          itemDesc: 'A nice pen',
          initQty: 5,
          isReturnable: 'trueth',
          availableQty: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('isReturnable should be a boolean value');
          done();
        });
    });
    // check for item available quantity
    it('should check for item available quantity', (done) => {
      request(app)
        .post('/api/v1/items')
        .send({
          itemName: 'Pen',
          itemDesc: 'A nice pen',
          initQty: 5,
          isReturnable: true,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('available quantity is required');
          done();
        });
    });
    // check for item available quantity validity
    it('should check for item available quantity validity', (done) => {
      request(app)
        .post('/api/v1/items')
        .send({
          itemName: 'Pen',
          itemDesc: 'A nice pen',
          initQty: 5,
          isReturnable: true,
          availableQty: 'll',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.errors[0].msg).to.equal('available quantity should be a number');
          done();
        });
    });
    // end of create item end-point.
  });
});
