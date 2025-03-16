require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const app = express();
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

app.use(bodyParser.json());

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use(errorHandler);

connectDB();

module.exports = app;
