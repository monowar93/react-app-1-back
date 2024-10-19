const express = require('express');
const path = require('path');
const { getRegister } = require('../controllers/register.controller');
const { postRegister } = require('../controllers/register.controller');
const router = express.Router();

// Serve static files from the views directory for css file
router.use(express.static(path.join(__dirname, '../views')));

router.get('/', getRegister);

router.post('/', postRegister);

module.exports = router;
