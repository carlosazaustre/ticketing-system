import express from 'express';
import mongoose from 'mongoose';
import Ticket from '../models/Ticket.js';

const router = express.Router();

router.post('/', async (req, res) => {
    const ticket = new Ticket({
        user: req.body.userId,
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

router.put('/:id', (req, res) => {
    const updates = req.body;
    try {
        const ticket = Ticket.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!ticket) return res.status(404).send('Ticket not found.');
        res.status(200).send(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const ticket = Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) return res.status(404).send('Ticket not found.');
        res.status(204).send(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
