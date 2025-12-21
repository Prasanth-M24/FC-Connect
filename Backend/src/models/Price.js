const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    commodity: {
        type: String,
        required: [true, 'Please add a commodity name']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    quantity: {
        type: Number
    },
    unit: {
        type: String
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    market: {
        type: String,
        default: 'General'
    },
    sellerName: {
        type: String
    },
    phone: {
        type: String
    },
    image: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Price', priceSchema);
