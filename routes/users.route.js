const express = require('express');
const router = express.Router();
const path = require('path');
const {
  getUsers,
  postUsers,
  putUsers,
  deleteUsers,
} = require('../controllers/users.controller');

router.use(express.static(path.join(__dirname, '../views')));

router.get('/', getUsers);
router.post('/', postUsers);
router.put('/:id', putUsers);
router.delete('/:id', deleteUsers);

module.exports = router;
