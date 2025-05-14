const mongoose  = require('mongoose');

const ProductSchema  = new mongoose.Schema({
    id : String,
    image : String,
    mainHeading : String,
    subHeading : String,
    MRP : Number,
    Deal : Number,
    description : String,
    name : String,
    price : Number,
    width : String
});

const Products = new mongoose.model('product', ProductSchema);
module.exports = Products