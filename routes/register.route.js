const express = require('express');
const path = require('path');
const router = express.Router();
const {
  getRegister,
  postRegister,
} = require('../controllers/register.controller');

// Serve static files from the views directory for css file
router.use(express.static(path.join(__dirname, '../views')));

router.get('/', getRegister);
router.post('/', postRegister);

module.exports = router;
