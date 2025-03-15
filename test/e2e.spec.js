const app = require('../src/app');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');

describe('Service tests', () => {
  it('some happy day scenerio test', async () => {
    const createResults = await request(app)
      .post('/products')
      .send({ name: 'food', description: 'good food', price: 2, stock: 1 })
      .expect(201);

    await request(app)
      .post(`/products/${createResults.body.id}/sell`)
      .send({ quantity: 1 })
      .expect(200);

    await request(app)
      .post(`/products/${createResults.body.id}/restock`)
      .send({ quantity: 35 })
      .expect(200);

    const responseGetAll1 = await request(app).get('/products').expect(200);
    const productStock1 = responseGetAll1.body.find(
      (p) => p._id === createResults.body.id
    );
    expect(productStock1.stock).equal(35);

    const orderResponse = await request(app)
      .post(`/orders`)
      .send({
        customerId: 1,
        products: new Array(32).fill(createResults.body.id),
      })
      .expect(201);
    expect(orderResponse.body.price).equal(51.2);

    const responseGetAll2 = await request(app).get('/products').expect(200);
    const productStock2 = responseGetAll2.body.find(
      (p) => p._id === createResults.body.id
    );
    expect(productStock2.stock).equal(3);

    const orderError = await request(app)
      .post(`/orders`)
      .send({
        customerId: 1,
        products: new Array(4).fill(createResults.body.id),
      })
      .expect(400);

    expect(orderError.body.error).equal(
      `Not enough in stock ${createResults.body.id}`
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
