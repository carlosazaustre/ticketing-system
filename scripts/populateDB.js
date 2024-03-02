import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User.js";
import Ticket from "../models/Ticket.js";

// Connect to the local database
mongoose.connect('mongodb://localhost:27017/ticketingSystem')
    .then(() => console.log('💾 Connected to the database'))
    .catch((err) => console.error('❌ Error connecting to the database', err));

const users = [
    { name: 'user', role: 'user', email: 'user@email.com', password: '12345678' },
    { name: 'admin', role: 'admin', email: 'admin@email.com', password: '12345678' }
];

const statuses = ['open', 'closed'];
const priorities = ['high', 'medium', 'low'];

async function deleteCollections() {
    await User.deleteMany({});
    console.log(`✏️ Users collection deleted.`);
    await Ticket.deleteMany({});
    console.log(`✏️ Tickets collection deleted.`);
}

async function createUsers() {
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
    }
}

async function createTickets() {
    const users = await User.find();
    
    for (let i = 0; i < 15; i++) {
      const ticket = new Ticket({
        title: `Ticket #${i}`,
        description: `This is a description #${uuidv4()}`,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        priority: priorities[Math.floor(Math.random() * priorities.length)],
        user: users[Math.floor(Math.random() * users.length)].id,
      });

      await ticket.save();
    }
}

async function populateDB() {
    await deleteCollections();
    await createUsers();
    await createTickets();
    console.log('✅ Database populated.');
    mongoose.disconnect();
  }
  
populateDB();