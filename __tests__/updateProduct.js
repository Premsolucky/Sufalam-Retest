const request = require('supertest')
const sequelize = require('../config/db')
// const express = require("express");
// const { ProductModel } = require('../models/Product')
// const app = express();
const app = require('../app')
// app.use('/api',require('./../routes/route'))

beforeAll(async () => {
//   Establish the database connection
  await sequelize.authenticate();
});

afterAll(async () => {
  // Close the database connection
  await sequelize.close();
});


describe('update Product API', () => {
  const product = {
    name: 'Updated Product',
    price: 20
  };
    test('Invalid product ID', async () => {
    const invalidProductId = 999; // Replace with a non-existent product ID
    console.log("OHHHAHAHHA");
    const res = await request(app)
      .patch(`/api/update/${invalidProductId}`)
      .field('name', product.name)
      .field('price', product.price)
      .then((res)=>{
        console.log("OHHHH",res.body);
      })

    // expect(res.status).toBe(400);
    // expect(res.body).toHaveProperty('error', 'There is no product for such id');
  });
})