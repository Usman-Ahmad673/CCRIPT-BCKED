const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken');

// exports.authenticateToken = catchAsyncError(async (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token === null) return res.sendStatus(401);

//     jwt.verify(token, 'asdfghjklzxcvbnmqwertyuiopasdfgh', (err, user) => {
//         if (err) {
//             return res.status(403).json({
//                 success: false,
//                 message: "Token is Expired"
//             });
//         }

//         // If the token is valid, you can attach the user to the request
//         req.user = user;
//         next();
//     });
// });

exports.authenticateToken = catchAsyncError(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token === null) return res.sendStatus(401);
    console.log("authenticatecalled")
    jwt.verify(token, 'asdfghjklzxcvbnmqwertyuiopasdfgh', (err, user) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: "Token is Expired or Invalid"
            });
        }

        // If the token is valid, you can attach the user to the request
        req.user = user;
        next();
    });
});