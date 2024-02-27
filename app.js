import express from 'express';
import ticketsRoutes from './routes/ticketsRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/tickets', ticketsRoutes);

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});