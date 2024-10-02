const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'Pending', // Pendiente, Recogido, Entregado
    },
    pickupDate: {
        type: Date,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('Donation', donationSchema);