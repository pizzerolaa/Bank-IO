const Donation = require('../models/donationModel');

// Crear nueva donación
const createDonation = async (req, res) => {
    console.log(req.body); // Agregar log para ver los datos recibidos

    const { donor, type, quantity, unit, expirationDate, location, availableTimes, comments, urgent } = req.body;

    try {
        if (!donor) {
            return res.status(400).json({ message: 'Donante es requerido' });
        }

        const donation = new Donation({ donor, type, quantity, unit, expirationDate, location, availableTimes, comments, urgent });
        await donation.save();

        res.status(201).json({donationId: donation._id});
    } catch (error) {
        console.error(error); // Agregar log para ver el error
        res.status(500).json({ message: error.message });
    }
};


// Obtener todas las donaciones
const getDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate('donor', 'name lastName email');
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una donación por ID
const getDonationById = async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await Donation.findById(id).populate('donor', 'name lastName email');

        if (!donation) {
            return res.status(404).json({ message: 'Donación no encontrada' });
        }

        res.json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una donación
const updateDonation = async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await Donation.findByIdAndUpdate(id, req.body, { new: true });

        if (!donation) {
            return res.status(404).json({ message: 'Donación no encontrada' });
        }

        res.json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una donación
const deleteDonation = async (req, res) => {
    const { id } = req.params;

    try {
        const donation = await Donation.findByIdAndDelete(id);

        if (!donation) {
            return res.status(404).json({ message: 'Donación no encontrada' });
        }

        res.json({ message: 'Donación eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener donaciones por ID del donante
const getDonationsByDonor = async (req, res) => {
    const { donorId } = req.params;

    try {
        const donations = await Donation.find({ donor: donorId }).populate('donor', 'name lastName email');

        if (!donations.length) {
            return res.status(404).json({ message: 'No se encontraron donaciones para este donante' });
        }

        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const qrDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id).populate('donor');
        if (!donation) {
            return res.status(404).json({ message: 'Donación no encontrada' });
        }
        res.json(donation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createDonation, getDonations, getDonationById, updateDonation, deleteDonation, getDonationsByDonor, qrDonation };
