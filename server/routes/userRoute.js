const express = require('express');
const { registerUser,loginUser,getCurrentUser ,getOTP, getSalt} = require('../controller/userController');

const validateTokenHandler = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post('/register',registerUser);

router.post('/otp',getOTP);

router.post('/login', loginUser);

router.get('/current', validateTokenHandler, getCurrentUser);

router.post('/salt',getSalt);

module.exports = router;