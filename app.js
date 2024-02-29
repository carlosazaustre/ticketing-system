import express from 'express';
import morgan from 'morgan';
import ticketsRoutes from './routes/ticketsRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

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