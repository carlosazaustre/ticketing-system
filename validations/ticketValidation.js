import Joi from 'joi';

const ticketSchema = Joi.object({
    user: Joi.string().required(),
    title: Joi.string().min(3).required(),
    description: Joi.string().min(5).required(),
    priority: Joi.string().valid('low', 'medium', 'high').required(),
    status: Joi.string().valid('open', 'closed'),
});

export default ticketSchema;