function admin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res
            .status(403)
            .send('Access denied. Don\'t have permission to perform this action.');
    }
    next();
}

export default admin;