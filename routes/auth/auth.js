const express = require('express');
const router = express.Router();

//plugging all auth routes
const registerRoute = require('./register');
const loginRoute = require('./login');
const logoutRoute = require('./logout');
router.use('/register', registerRoute);
router.use('/login', loginRoute);
router.use('/logout', logoutRoute);

module.exports = router;