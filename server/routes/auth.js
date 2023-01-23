var express = require('express');
var router = express.Router();
var {
    registerUser,
    loginUser
} = require('../controllers/authController')

//routes
router.post('/register', registerUser)
router.post('/login', loginUser)

module.exports = router;
