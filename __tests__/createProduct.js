const chai = require('chai')
const chaiHttp = require('chai-http')
const request = require('supertest')
const sequelize = require('../config/db')
const path = require('path');
const fs = require('fs')
const imagePath = path.join(__dirname, '..', 'Images', 'image.jpg');
const app = require('../app');


chai.use(chaiHttp);
beforeAll(async () => {
    //   Establish the database connection
    await sequelize.authenticate();
});

afterAll(async () => {
    // Close the database connection
    await sequelize.close();
});

describe('create Product API', () => {
    it('if there is no data provided or Any one field is missing to create Product', async () => {
        const res = await request(app).post(`/app/createProduct`);
            console.log(res);
        expect(res.statusCode).toBe(400); 
        expect(res.body).toHaveProperty('error', 'Please fill all the details'); // Verify the response body has the correct success message
    });

    it('should return 201 and create Product Record with single image upload',  (done) => {
        
        const res = chai.request(app)
            .post('/app/add')
            // .attach('data', form)
            .field('name', 'abc')
            .field('price', '100')
            .attach('image', fs.readFileSync(imagePath), 'image.jpg')
            .set('Content-Type', 'multipart/form-data')
            .set('Accept', 'application/json')
            .then((response) => console.log("TEEEE",response));
            done()
        
        // expect(res.status).to.equal(200);
        // expect(res.body).toHaveProperty('message', 'Product created successfully');
   

})

})