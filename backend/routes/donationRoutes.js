const express = require('express');
const { createDonation, getDonations } = require('../controllers/donationController');
const router = express.Router();

router.post('/', createDonation);
router.get('/', getDonations);

module.exports = router;