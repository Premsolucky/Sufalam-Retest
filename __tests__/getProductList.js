const request = require('supertest')
const sequelize = require('./../config/db')
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
})

describe('get Product List API', () => {

    test('if product list is there', async () => {
        const res = await request(app)
            .get(`/app/productList`)
        expect(res.statusCode).toBe(200); 
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('message', 'Product List is retrieved successfully'); // Verify the response body has the correct success message

    });

    test('if product list is with other Filters & searching', async () => {
        let number=3;
        let search='Books';
        let sortValue=0;
        const res = await request(app)
            .get(`/app/productList?${name=search}&${limit=number}&${sortBy=sortValue}`)
        expect(res.statusCode).toBe(200); 
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('message', 'Product List is retrieved successfully'); // Verify the response body has the correct success message

    });
})
//there can be many test cases here.