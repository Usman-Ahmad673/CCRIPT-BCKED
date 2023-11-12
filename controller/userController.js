const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const User = require('../model/userModel')
const sendToken = require('../utils/jwtToken')
const jwt = require('jsonwebtoken');



// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return next(new ErrorHandler("Please Enter Name & Password", 400));
    }

    const user = await User.findOne({ name });

    if (!user) {
        return next(new ErrorHandler("Invalid Name & Password", 401));
    }

    const isPasswordMatched = user.password === password;

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Name & Password", 401));
    }

    sendToken(user, 200, res);
});

// Appointments
exports.getAppointments = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        success: true,
        appointments: ["appointment1", "appointment2"],
    });
});


// // Refresh Token
// exports.refreshToken = catchAsyncError(async (req, res, next) => {
//     try {
//         // Extract the authorization token from the request header
//         console.log(req.headers)
//         const authHeader = req.headers['authorization'];
//         // const authHeader = req.headers['Authorization'];
//         console.log(authHeader)
//         const currentToken = authHeader && authHeader.split(' ')[1];

//         if (!currentToken) {
//             return next(new ErrorHandler("Token not provided", 401));
//         }

//         // Verify the current token
//         const decodedData = jwt.verify(currentToken, 'your-secret-key'); // Replace with your secret key
//         const userId = decodedData.id;

//         // Assuming you have a method to get the user based on the user ID
//         const user = await User.findById(userId);

//         // Generate a new token with a renewed expiration time
//         const newToken = jwt.sign({ id: user._id, username: user.username }, 'your-secret-key', {
//             expiresIn: '15m', // Set the expiration time as needed
//         });

//         // Set the new token in the response header
//         res.header('Authorization', `Bearer ${newToken}`);

//         // Send the new token in the response
//         res.status(200).json({
//             success: true,
//             token: newToken,
//         });
//     } catch (err) {
//         // Handle JWT verification errors
//         return next(new ErrorHandler("Invalid Token", 401));
//     }
// });

exports.refreshToken = catchAsyncError(async (req, res, next) => {
    try {
        console.log("TRY CALLED");
        const authHeader = req.headers['authorization'];

        const refreshToken = authHeader && authHeader.split(' ')[1];

        if (!refreshToken) {
            return next(new ErrorHandler("Refresh token not provided", 401));
        }

        // Wrap jwt.verify in a Promise
        const verifyPromise = new Promise((resolve, reject) => {
            jwt.verify(refreshToken, 'your-refresh-secret-key', (err, decodedData) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decodedData);
                }
            });
        });

        const decodedData = await verifyPromise;


        const user = await User.findById(decodedData.id);

        if (!user) {
            return next(new ErrorHandler("User not found", 404));
        }

        const newAccessToken = user.getJWTToken();

        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
        });
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Invalid Refresh Token", 401));
    }
});