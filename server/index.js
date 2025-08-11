require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path');
require('./DB/ConnDB');

const _dirname = path.resolve();
const Products = require('./Models/ProductSchema.js');
const defaultData = require('./DefaultData')
const Router = require('./Routes/Router');
const port = 8000

app.use(express.json());
app.use(cookieParser(""));
app.use(cors({origin: 'http://localhost:5173', credentials: true}));
app.use(Router);

app.get('*', (req,res) => {
    res.sendFile(path.resolve(_dirname, 'client', 'dist', 'index.html'))
})
app.listen(port, () =>{
    console.log(`App is Running on Port`);
});

