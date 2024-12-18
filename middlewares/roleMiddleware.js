exports.authorize = (roles) => {
    return (req, res, next) => {
        if (!roles.some((role) => req.user.roles.includes(role))) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
};
