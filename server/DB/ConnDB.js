const mongoose = require('mongoose');
require('dotenv').config();
const DB = process.env.DB

mongoose.connect(DB, {
  serverSelectionTimeoutMS: 30000,
}).then(() => console.log('DataBase Connected Successfully')) .catch((error) => console.log('Error ' + error.message));
