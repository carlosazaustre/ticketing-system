import logger from '../helpers/logger.js';

function error(err, req, res, next) {
    logger.error(err.message, { metadata: err });

    res.status(500).send('Something failed.');
}

export default error;