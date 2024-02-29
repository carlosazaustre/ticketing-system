import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import ticketsRoutes from './routes/ticketsRoutes.js';

const app = express();
const port = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('💾 Connected to MongoDB'))
    .catch(err => console.error('❌ Failed to connect to MongoDB', err));

app.use(morgan('dev'));
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/tickets', ticketsRoutes);

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});