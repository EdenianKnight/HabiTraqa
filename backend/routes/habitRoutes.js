const express = require('express');
const { getHabits, addHabit, updateHabit, deleteHabit } = require('../controllers/habitController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getHabits);
router.post('/', protect, addHabit);
router.put('/:id', protect, updateHabit);
router.delete('/:id', protect, deleteHabit);

module.exports = router;
