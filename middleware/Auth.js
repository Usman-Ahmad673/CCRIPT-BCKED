const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const sendToken = require('../utils/jwtToken');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.token;

    console.log(`Token from Auth.js: ${token}`);

    if (!token) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    try {
        const decodedData = jwt.verify(token, 'asdfghjklzxcvbnmqwertyuiopasdfgh');

        console.log(`Decoded Token from Auth.js: ${decodedData}`);

        // You might want to add the user to the request object for future middleware/routes
        req.user = await User.findById(decodedData.id);

        next();
    } catch (err) {
        return next(new ErrorHandler("Invalid Token", 401));
    }
});
