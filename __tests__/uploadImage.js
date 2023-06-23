const chai = require('chai')
const chaiHttp = require('chai-http')
// import chaiHttp from 'chai-http';
const request = require('supertest')
const sequelize = require('../config/db')
const path = require('path');
const fs = require('fs')
// Construct the absolute file path
const imagePath = path.join(__dirname, '..', 'Images', 'image.jpg');
const imageBuffer = fs.readFileSync(imagePath)
const app = require('../app');
const { expect } = chai;
const FormData = require('form-data');

chai.use(chaiHttp);
beforeAll(async () => {
//   Establish the database connection
  await sequelize.authenticate();
});

afterAll(async () => {
  // Close the database connection
  await sequelize.close();
});


describe('Upload Image of Product API', () => {

    test('Invalid product ID', async () => {
    const invalidProductId = 999; // Replace with a non-existent product ID
    console.log("OHHHAHAHHA");
    const res = await request(app)
      .put(`/api/upload/${invalidProductId}`)
      .then((res)=> res)
      
    // expect(res.status).toBe(400);
    // expect(res.body).toHaveProperty('error', 'There is no product for such id');
  });

  test('upload image on successfull', async () => {
        
    const res = await chai.request(app)
        .put('/app/upload')
        .set('Content-Type', 'multipart/form-data')
        .set('Accept', 'application/json')
        .attach('image', fs.readFileSync(imagePath), 'image.jpg')
        console.log("ABABABA",res )
      
    
    // expect(res.status).to.equal(200);
    // expect(res.body).toHaveProperty('message', 'Product uploaded successfully');


})
})

   
      
