const express = require('express');
const path = require('path');
const router = express.Router();
const {
  createRegistration,
  login,
  getAllUsers,
} = require('../controllers/registration.controller');
const {
  registrationValidator,
  handleValidationResults,
} = require('../middlewares/registration.middleware');

router.post(
  '/',
  registrationValidator,
  handleValidationResults,
  createRegistration
);
router.post('/login', login);
router.get('/', getAllUsers);

module.exports = router;
