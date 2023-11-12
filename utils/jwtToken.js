// const jwt = require('jsonwebtoken');

// const sendToken = (user, statusCode, res) => {
//     const token = user.getJWTToken();

//     console.log(`Token from JWTToken.js: ${token}`);

//     res.status(statusCode).json({
//         success: true,
//         user,
//         token,
//     });
// };

// module.exports = sendToken;

const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const accessToken = user.getJWTToken();
    const refreshToken = generateRefreshToken(user);

    console.log(`Access Token from JWTToken.js: ${accessToken}`);
    console.log(`Refresh Token from JWTToken.js: ${refreshToken}`);

    res.status(statusCode).json({
        success: true,
        user,
        accessToken,
        refreshToken,
    });
};

// Function to generate a refresh token
function generateRefreshToken(user) {
    return jwt.sign({ id: user._id }, 'your-refresh-secret-key', {
        expiresIn: '7d', // Set the expiration time for the refresh token
    });
}

module.exports = sendToken;
