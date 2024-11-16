const express = require('express');
const router = express.Router();
const path = require('path');
const {
  getAllUsers,
  createUsers,
  updateUsers,
  getOneUser,
  deleteUsers,
} = require('../controllers/users.controller');

// router.use(express.static(path.join(__dirname, '../views')));

router.get('/', getAllUsers);
router.get('/:name', getOneUser);
router.post('/', createUsers);
router.put('/:name', updateUsers);
router.delete('/:name', deleteUsers);

module.exports = router;
