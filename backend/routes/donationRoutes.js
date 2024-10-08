const express = require('express');
const { createDonation, getDonations, getDonationsByDonor, qrDonation } = require('../controllers/donationController');

const router = express.Router();

router.post('/post', createDonation);
router.get('/get', getDonations);
router.get('/getByDonor/:donorId', getDonationsByDonor);
router.get(':id', qrDonation);

module.exports = router;
