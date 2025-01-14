const express = require('express');
const path = require('path');
const router = express.Router();
const { getPayments, postPayments,getSuccess,getCancel} = require('../controllers/payments.controller');

// Serve the payment page
router.get('/', getPayments);
router.get('/success', getSuccess);
router.get('/cancel', getCancel);

// Create the Stripe Checkout session
router.post('/create-checkout-session', postPayments);

module.exports = router;
