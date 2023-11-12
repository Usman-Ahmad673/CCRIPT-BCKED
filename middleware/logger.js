const loggerMiddleware = (req, res, next) => {
    console.log(`API called: ${req.path}`);
    next(); // Move to the next middleware or route handler
};

module.exports = loggerMiddleware;