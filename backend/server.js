import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { notFound, errorHandler } from './middleWare/errorHandler.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import swaggerDocs from './utils/swagger.js';

dotenv.config();

mongoose.set('strictQuery', true);

connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')));

    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'frontend', 'build', 'index.html'),
        );
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running....');
    });
}

const PORT = process.env.PORT || 5000;
app.use(notFound);
app.use(errorHandler);
swaggerDocs(app, PORT);

app.listen(
    5000,
    console.log(
        `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold,
    ),
);
