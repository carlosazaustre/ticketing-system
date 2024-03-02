import express from 'express';
import Ticket from '../models/Ticket.js';
import ticketSchema from '../validations/ticketValidation.js';
import auth from '../middlewares/auth.js';
import admin from '../middlewares/admin.js';
import paginate from '../middlewares/pagination.js';
import buildFilter from '../middlewares/filter.js';

const router = express.Router();

// Get all tickets
// GET /api/tickets
// GET /api/tickets?pageSize=10&page=1
// GET /api/tickets?status=open&priority=high
// GET /api/tickets?search=bug
// Public
router.get('/', buildFilter, paginate(Ticket), (req, res) => {
    res.status(200).send(req.paginatedResults);
});

// Create a ticket
// POST /api/tickets
// Private (only logged in users can create tickets)
// Ticket Schema: user, title, description, priority, status
router.post('/', auth, async (req, res) => {
    const { error } = ticketSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    
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

// Get a ticket by id
// GET /api/tickets/:id
// Public
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ id: req.params.id });
        if (!ticket) {
            return res.status(404).send('Ticket not found.');
        }
        
        res.status(200).send(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a ticket by id
// PUT /api/tickets/:id
// Private (only logged in users can update tickets)
// Ticket Schema: user, title, description, priority, status
router.put('/:id', auth, async (req, res) => {
    const updates = req.body;
    try {
        const ticket = await Ticket.findOneAndUpdate({ id: req.params.id } , updates, { new: true });
        if (!ticket) {
            return res.status(404).send('Ticket not found.');
        }
        
        res.status(200).send(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a ticket by id
// DELETE /api/tickets/:id
// Private (only admin users can delete tickets)
router.delete('/:id', [auth, admin], async (req, res) => {
    try {
        const ticket = await Ticket.findOneAndDelete({ id: req.params.id });
        if (!ticket) {
            return res.status(404).send('Ticket not found.');
        }

        res.status(204).send(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
