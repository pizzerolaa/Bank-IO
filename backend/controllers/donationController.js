const Donation = require('../models/donationModel');

//creamos nueva donacion
const createDonation = async (req, res) => {
    try {
        const donation = new Donation(req.body);
        await donation.save();
        res.status(201).json(donation);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//obtenemos todas las donaciones
const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate('donor', 'name lastName email');
        res.json(donations);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = { createDonation, getDonations };