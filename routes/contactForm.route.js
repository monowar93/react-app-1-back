const express = require('express');
const router = express.Router();
const path = require('path');
const {
  postContact,
  getContact,
} = require('../controllers/contact.controller');

router.use(express.static(path.join(__dirname, '../views/form.css')));

router.post('/', postContact);
router.get('/', getContact);

module.exports = router;
