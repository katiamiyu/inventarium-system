import request from 'supertest';
import chai from 'chai';
import app from '../../app';

const { expect } = chai;
describe('Test on items endpoints', () => {
  describe('Create items endpoint', () => {
    // create items
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
  describe('Get all items endpoint', () => {
    // get all items
    it('should retrieve all available items', (done) => {
      request(app)
        .get('/api/v1/items')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('items retrieved successfully');
          done();
        });
    });
    // end of get all items end-point
  });
  describe('Get item by id endpoint', () => {
    // get items by id
    it('should retrieve item by id', (done) => {
      request(app)
        .get('/api/v1/items/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('item retrieved successfully');
          done();
        });
    });
    it('should check for valid item id', (done) => {
      request(app)
        .get('/api/v1/items/one')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('invalid id');
          done();
        });
    });
    // end of get items by id end-point
  });
  describe('Update item endpoint', () => {
    // update item
    it('should update item record', (done) => {
      request(app)
        .put('/api/v1/items/1')
        .send({
          itemName: 'Book',
          itemDesc: 'A nice book',
          initQty: 7,
          isReturnable: true,
          availableQty: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('item updated successfully');
          done();
        });
    });
    it('should update item record', (done) => {
      request(app)
        .put('/api/v1/items/2')
        .send({
          itemName: 'Marker',
          itemDesc: 'A nice marker',
          initQty: 7,
          isReturnable: true,
          availableQty: 4,
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body.message).to.equal('item not found');
          done();
        });
    });
  });
  describe('remove item endpoint', () => {
    it('should remove item by id', (done) => {
      request(app)
        .delete('/api/v1/items/1')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .end((err, res) => {
          expect(res.body.message).to.equal('item removed successfully');
          done();
        });
    });
    // end of remove item by id end-point
  });
});
