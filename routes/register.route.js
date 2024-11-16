const express = require('express');
const path = require('path');
const router = express.Router();
const {
  getRegister,
  getSignIn,
  getLogIn,
  getProfile,
  getLogOut,
  postRegister,
  postLogIn,
} = require('../controllers/register.controller');

// Serve static files from the views directory for css fil

router.get('/', getRegister);
router.get('/signin', getSignIn);
router.get('/login', getLogIn);
router.get('/profile', getProfile);
router.get('/logout', getLogOut);

router.post('/', postRegister);
router.post('/login', postLogIn);

module.exports = router;
