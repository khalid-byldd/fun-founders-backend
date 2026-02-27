const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require('../controllers/usersController');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

module.exports = router;
