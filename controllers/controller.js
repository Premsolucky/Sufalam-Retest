
const { Sequelize, Op } = require('sequelize');
const db = require('../config/db');
const product = require('../models/Product')


//Get Product List API
exports.getListOfProducts = async (req, res) => {
    try {
        const { limit, offset, name, startDate, endDate, sortBy } = req.query;
        //Pagination 
        const limitValue = parseInt(limit) || 10;
        const offsetValue = parseInt(offset) || 0;

        // Create a filter object to hold the dynamic filtering conditions
        const filter = {};
        //Search for Product Name
        if (name) {
            filter.name = { [Sequelize.Op.iLike]: `%${name}%` };
        }
        // Add the date range filter if both startDate and endDate are provided
        if (startDate && endDate) {
            filter.createdAt = { [Sequelize.Op.between]: [new Date(startDate), new Date(endDate)], };
        }
        // Set the sorting order
        const sortOrder = sortBy === '0' ? 'ASC' : 'DESC';
        // Retrieve the products with pagination and applied filters/sorting
        const { rows: products, count: totalCount } = await product.findAndCountAll({
            where: filter,
            limit: limitValue,
            offset: offsetValue,
            order: [['createdAt', sortOrder]],
        });

        if (products.length > 0) {
            res.status(200).json({
                success: true, message: "Product List is retrieved successfully",
                totalCount: totalCount, products
            });
        } else {
            res.status(400).json({ success: true, message: "There are no products available!" });
        }
    } catch (error) {
        res.status(400).json({ error: 'Error while retrieving products List ' });
    }
};
// Get Single Product details API 
exports.getProduct = async (req, res) => {
    try {
        const { id }  = req.params;
        
        const products = await product.findAll({ where: {id:id} });

        if (products.length > 0) {
            res.status(200).json({
                success: true, message: "Succesfully fetched the Product Details",
                products
            });
        }
        else {
            res.status(400).json({ error: "Product with this product Id is not availaible." });
        }
    }
    catch (error) {
        res.status(400).json({ error: 'Please provide a valid productId to fetch the Product Details' });
    }
};


// Insert Product Data
exports.createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        if (!name || !price || !req.file) {
            return res.status(400).json({ error: 'Please fill all the details' });
        }
        let productData = {};
        if (req.file) {
            productData.name = name,
                productData.image = req.file.location,
                productData.price = price
        }
        console.log(productData)
        const addproduct = await product.create(productData);
        if (!addproduct) {
            return res.status(400).json({ error: 'Error While Storing Product into Databse' });
        }
        else {
            return res.status(200).json({ success: true, message: 'Product created successfully' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error while Creating/Adding Product' });
    }
}
//upload Product Image
exports.uploadProductImage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a valid image first' });
        }
        const prodctById = await product.findByPk(id);
        if (prodctById) {
            const updateObject = {
                image: req.file ? req.file.location : prodctById.image,
                updatedAt: new Date()
            };
            console.log(updateObject);
            const updateData = await product.update(updateObject, {
                where: { id: id },
            });
            if (updateData.length > 0) {
                return res.status(200).json({ success: true, message: 'Image updated/uploaded successfully' });
            }
            else {
                return res.status(400).json({ message: 'Error while updating/uploading Image' });
            }
        }
        else {
            return res.status(400).json({ error: 'There is no product for such id' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error while Upload Image API' });
    }
}
//update Product
exports.updateProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const { id } = req.params;
        const prodctById = await product.findByPk(id);
        if (!name && !price && !req.file) {
            return res.status(400).json({ message: 'No update data provided' });
        }
        if (prodctById) {
            const updateObject = {
                name: name ? name : prodctById.name,
                image: req.file ? req.file.location : prodctById.image,
                price: price ? price : prodctById.price,
                updatedAt: new Date()
            };

            const updateData = await product.update(updateObject, {
                where: { id: id },
            });
            if (updateData.length > 0) {
                return res.status(200).json({ success: true, message: 'Product Data updated successfully' });
            }
            else {
                return res.status(400).json({ message: 'Error while updating product Data' });
            }
        }
        else {
            return res.status(400).json({ error: 'There is no product for such id' });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error in Update Api' });
    }
}





