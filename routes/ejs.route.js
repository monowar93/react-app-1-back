const express = require('express');
const path = require('path');
const router = express.Router();

let allPl = [];

router.get('/', (req, res) => {
  res.render('../views/ejs/ejs.ejs', { pLanguage: allPl });
});
router.get('/author', (req, res) => {
  res.render('../views/ejs/ejsAuthor.ejs', {});
});

router.post('/', (req, res) => {
  const pLanguage = req.body.pLanguage;
  allPl.push(pLanguage);
  res.redirect('/api/ejs'); //reload home route
});

module.exports = router;
