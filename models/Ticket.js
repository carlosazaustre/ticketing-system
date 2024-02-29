import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['open', 'in-progress', 'closed'], default: 'open' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;