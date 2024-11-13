const express = require('express');
const Products = require('../Models/ProductSchema');
const Router = new express.Router();

Router.get('/getproducts', async(req, res) =>{
    try {
        const AllProducts = await Products.find();
        console.log(AllProducts);
        
        res.status(201).json(AllProducts);
    } catch (error) {
        console.log('Error' + error.message);
    }
});

module.exports = Router;