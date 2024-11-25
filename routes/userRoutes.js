const express = require('express');
const { getProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/profile', protect, getProfile);
router.get('/admin', protect, authorize(['Admin']), (req, res) => {
    res.send('Welcome Admin!');
});
router.get('/user', protect, authorize(['User']), (req, res) => {
    res.send('Welcome User!');
});

module.exports = router;
