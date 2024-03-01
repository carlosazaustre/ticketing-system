import 'dotenv/config'
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import usersRoutes from './routes/usersRoutes.js';
import ticketsRoutes from './routes/ticketsRoutes.js';
import error from './middlewares/error.js';
import rateLimit from './helpers/rateLimit.js';

const app = express();

const DB_URL = process.env.NODE_ENV === 'test'
    ? 'mongodb://localhost:27017/ticketingSystem-test'
    : process.env.DB_URL || 'mongodb://localhost:27017/ticketingSystem';

mongoose.connect(DB_URL)
    .then(() => console.log(`💾 Connected to MongoDB (${DB_URL})`))
    .catch(err => console.error('❌ Failed to connect to MongoDB', err));

app.use(morgan('dev'));
app.use(helmet());
app.use(rateLimit)
app.use(cors());
app.use(compression());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use(error);

export default app;