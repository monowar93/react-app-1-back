const express = require('express');
const router = express.Router();

let contactData;

router.post('/', (req, res) => {
  contactData = req.body;
  console.log(contactData);

  res.send('Contact Form submitted successfully!');
});
router.get('/', (req, res) => {
  res.send(contactData);
});
module.exports = router;
