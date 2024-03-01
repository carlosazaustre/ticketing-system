import express from 'express';
import Ticket from '../models/Ticket.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const ticket = new Ticket({
        user: req.user._id,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status
    });

    try {
        const newTicket = await ticket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).send(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) return res.status(404).send('Ticket not found.');
        res.status(200).send(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put('/:id', auth, async (req, res) => {
    const updates = req.body;
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!ticket) return res.status(404).send('Ticket not found.');
        res.status(200).send(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).send('Ticket not found.');
        res.status(204).send(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
