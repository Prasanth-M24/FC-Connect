const express = require('express');
const router = express.Router();
const { getPrices, createPrice, updatePrice, deletePrice } = require('../controllers/priceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getPrices);
router.post('/', protect, createPrice);
router.put('/:id', protect, updatePrice);
router.delete('/:id', protect, deletePrice);

module.exports = router;
