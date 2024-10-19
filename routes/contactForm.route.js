const express = require('express');
const router = express.Router();
const {
  postContact,
  getContact,
} = require('../controllers/contact.controller');

router.post('/', postContact);
router.get('/', getContact);

module.exports = router;
