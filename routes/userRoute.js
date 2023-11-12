const express = require('express')
const { loginUser, getAppointments, refreshToken } = require('../controller/userController')
// const {isAuthenticatedUser} = require('../middleware/Auth')
const { authenticateToken } = require('../middleware/isAuthenticateUser')
const router = express.Router()



router.route('/login').post(loginUser);
router.route('/refresh-token').get(refreshToken);
router.route('/appointments').get(authenticateToken, getAppointments); // Use the middleware for protected routes


module.exports = router