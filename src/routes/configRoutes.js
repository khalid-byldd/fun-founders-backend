const express = require('express');
const {
  createConfig,
  getConfigs,
  getConfigById,
  updateConfigById,
  deleteConfigById,
} = require('../controllers/configController');

const router = express.Router();

router.post('/', createConfig);
router.get('/', getConfigs);
router.get('/:id', getConfigById);
router.put('/:id', updateConfigById);
router.delete('/:id', deleteConfigById);

module.exports = router;
