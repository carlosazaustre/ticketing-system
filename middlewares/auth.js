import jwt from 'jsonwebtoken';

function auth(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
}

export default auth;