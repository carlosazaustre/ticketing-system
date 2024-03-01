import winston from 'winston';

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
    ),
    transports: [
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
    ],
});

export default logger;