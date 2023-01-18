import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import mongoose from 'mongoose';
import { notFound, errorHandler } from './middleWare/errorHandler.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();

mongoose.set('strictQuery', true); //this line is included to get rid of warning, yet don't know what it is.

connectDB();

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use('/api/products', productRoutes);
app.use('/api/users/', userRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  5000,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
