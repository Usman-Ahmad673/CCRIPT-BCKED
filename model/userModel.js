const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name Cannot Exceed 30 Letters"],
        minLength: [4, "Name Cannot Be Less Than 4 Letters"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password Cannot Be Less Than 8 Letters"],
        // select: false,
    },
});

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, 'asdfghjklzxcvbnmqwertyuiopasdfgh', {
        expiresIn: '30s', 
    });
};

module.exports = mongoose.model('User', userSchema);
