const express = require('express');
const { createDonation, getDonations, getDonationsByDonor } = require('../controllers/donationController');

const router = express.Router();

router.post('/post', createDonation);
router.get('/get', getDonations);
router.get('/getByDonor/:donorId', getDonationsByDonor);

module.exports = router;
