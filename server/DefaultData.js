const fSlider = require('./Constant/ProductData');
const Products = require('./Models/ProductSchema');

const DefaultData = async() =>{
    try {
        await Products.deleteMany({});

        const storeData = await Products.insertMany(fSlider);
        console.log(storeData);
    } catch (error) {
        console.log('Error' + error.message)
    }
}

module.exports = DefaultData;
