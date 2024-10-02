const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    type: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },
    unit: { 
        type: String, 
        required: true 
    },
    expirationDate: { 
        type: Date 
    },
    location: { 
        type: String 
    },
    availableTimes: { 
        type: String 
    },
    comments: { 
        type: String 
    },
    urgent: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

module.exports = mongoose.model('Donation', donationSchema);
