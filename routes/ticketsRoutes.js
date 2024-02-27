import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('All Tickets');
});
router.post('/', (req, res) => {
    res.send('New Ticket');
});
router.get('/:id', (req, res) => {
    res.send('Ticket ' + req.params.id);
});
router.put('/:id', (req, res) => {
    res.send('Update Ticket ' + req.params.id);
});
router.delete('/:id', (req, res) => {
    res.send('Delete Ticket ' + req.params.id);
});

export default router;
