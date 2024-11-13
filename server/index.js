require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors')
require('./DB/ConnDB');


const Products = require('./Models/ProductSchema.js');
const defaultData = require('./DefaultData')
const Router = require('./Routes/Router');


app.use(express.json());
app.use(cors());
app.use(Router);

port = 5500
app.listen(port, () =>{
    console.log(`App is Running on Port ${port}`);
});

defaultData();
