const Sequelize = require("sequelize");
const db = require('../config/db')

    const Product = db.define("products", {
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          image:{
            type: Sequelize.STRING,
            allowNull: false
          },
          price:{
            type: Sequelize.FLOAT,
            allowNull: false
          }
     });

module.exports=Product




