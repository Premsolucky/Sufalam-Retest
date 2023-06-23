const request = require('supertest')
const sequelize = require('./../config/db')
const app = require('../app');

beforeAll(async () => {
    //   Establish the database connection
    await sequelize.authenticate();
});

afterAll(async () => {
    // Close the database connection
    await sequelize.close();
});

describe('get Product API', () => {

    test('if id is not given', async () => {
        const id = 'abc';
        const res = await request(app)
            .get(`/app/getProduct/${id}`)
        expect(res.statusCode).toBe(400); // Verify the response status code is 200 (OK)
        expect(res.body).toHaveProperty('error', 'Please provide a valid productId to fetch the Product Details'); // Verify the response body has the correct success message

    });

    test('if id is invalid', async () => {
        const id = 'abc';
        const res = await request(app)
            .get(`/app/getProduct/${id}`)
        expect(res.statusCode).toBe(400); // Verify the response status code is 200 (OK)
        expect(res.body).toHaveProperty('error', 'Please provide a valid productId to fetch the Product Details'); // Verify the response body has the correct success message

    });

    test('if id is valid', async () => {
        const id = 1;
        const res = await request(app)
            .get(`/app/getProduct/${id}`)

        expect(res.statusCode).toBe(200); // Verify the response status code is 200 (OK)
        expect(res.body).toHaveProperty('success', true); // Verify the response body has the 'success' property as true
        expect(res.body).toHaveProperty('message', 'Succesfully fetched the Product Details'); // Verify the response body has the correct success message
    });
})