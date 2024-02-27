import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/tickets', (req, res) => {
    res.send('All Tickets');
});
app.post('/tickets', (req, res) => {
    res.send('New Ticket');
});
app.get('/tickets/:id', (req, res) => {
    res.send('Ticket ' + req.params.id);
});
app.put('/tickets/:id', (req, res) => {
    res.send('Update Ticket ' + req.params.id);
});
app.delete('/tickets/:id', (req, res) => {
    res.send('Delete Ticket ' + req.params.id);
});

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});