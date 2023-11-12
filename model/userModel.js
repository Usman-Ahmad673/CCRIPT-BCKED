// const mongoose = require('mongoose')
// const validator = require('validator')
// const jwt = require('jsonwebtoken')

// const userSchema = new mongoose.Schema({
//     name : {
//         type: String,
//         required: [true,"Please Enter Your Name"],
//         maxLength: [30,"Name Cannot Exceed 30 Letters"],
//         minLength: [4,"Name Cannot less 4 Letters"]
//     },
//     password : {
//         type: String,
//         required: [true,"Please Enter Your Password"],
//         minLength: [8,"Password Cannot less 8 Letters"],
//         // select: false,
//     },
// })



// // JWT Token
// userSchema.methods.getJWTToken = function () {
//     return jwt.sign({ id: this._id }, 'asdfghjklzxcvbnmqwertyuiopasdfgh', {
//         expiresIn: 30, // Set the expiration time to 30 seconds
//     });
// };


// module.exports = mongoose.model('User', userSchema)




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
        expiresIn: '30s', // Set the expiration time as needed
    });
};

module.exports = mongoose.model('User', userSchema);
