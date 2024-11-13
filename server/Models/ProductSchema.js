const mongoose  = require('mongoose');

const ProductSchema  = new mongoose.Schema({
    image : String,
    name : String,
    price : String,
    width : String
});

const Products = new mongoose.model('product', ProductSchema);
module.exports = Products