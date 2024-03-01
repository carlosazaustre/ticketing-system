import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';
import server from '../server.js';
import User from '../models/User.js';

describe('Users API', () => {
    beforeAll(async () => {
        await User.deleteMany({});
    });

    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    });

    test('Create a user', async () => { 
        const response = await request(app)
            .post('/api/users/signup')
            .send({
                name: 'Test User', 
                email: 'test@email.com', 
                password: '12345678', 
                role: 'user'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
    });
});