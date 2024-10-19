const express = require('express');
const router = express.Router();
const path = require('path');
const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require('../controllers/users.controller');

router.get('/', getUsers);
router.post('/', postUsers);
router.put('/:id', putUsers);
router.delete('/:id', deleteUsers);

module.exports = router;
