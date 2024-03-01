import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import usersRoutes from './routes/usersRoutes.js';
import ticketsRoutes from './routes/ticketsRoutes.js';
import error from './middlewares/error.js';

const app = express();
const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('💾 Connected to MongoDB'))
    .catch(err => console.error('❌ Failed to connect to MongoDB', err));

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/tickets', ticketsRoutes);
app.use(error);

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});