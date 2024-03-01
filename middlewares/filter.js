function buildFilter(req, res, next) {
    const { status, priority, search } = req.query;
    let filter = {};

    if (status) {
        filter.status = status;
    }
    if (priority) {
        filter.priority = priority;
    }
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } }
        ];
    }

    req.filter = filter;
    next();
}

export default buildFilter;