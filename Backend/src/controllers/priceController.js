const Price = require('../models/Price');
const axios = require('axios');

// @desc    Get all prices
// @route   GET /api/prices
// @access  Public
const getPrices = async (req, res) => {
    try {
        const query = req.query.user ? { user: req.query.user } : {};
        const prices = await Price.find(query).sort({ date: -1 });
        res.status(200).json(prices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new price
// @route   POST /api/prices
// @access  Private (Seller/Admin)
const createPrice = async (req, res) => {
    const { commodity, price, quantity, unit, state, district, sellerName, phone, image } = req.body;

    if (!commodity || !price) {
        return res.status(400).json({ message: 'Please add commodity and price' });
    }

    try {
        const newPrice = await Price.create({
            user: req.user.id,
            commodity,
            price,
            quantity,
            unit,
            state,
            district,
            sellerName,
            phone,
            image,
            market: district || 'General' // Default market to district if not specified
        });
        res.status(201).json(newPrice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a price listing
// @route   PUT /api/prices/:id
// @access  Private (Owner only)
const updatePrice = async (req, res) => {
    try {
        const price = await Price.findById(req.params.id);

        if (!price) {
            return res.status(404).json({ message: 'Price listing not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the price user
        if (price.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedPrice = await Price.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true // ensure updates follow schema
        });

        res.status(200).json(updatedPrice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a price listing
// @route   DELETE /api/prices/:id
// @access  Private (Owner only)
const deletePrice = async (req, res) => {
    try {
        const price = await Price.findById(req.params.id);

        if (!price) {
            return res.status(404).json({ message: 'Price listing not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the price user
        if (price.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await price.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Mandi Prices from Gov API
// @route   GET /api/prices/mandi
// @access  Public
const getMandiPrices = async (req, res) => {
    try {
        const { state, district, commodity, limit = 100, offset = 0 } = req.query;
        let url = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=${process.env.GOV_API_KEY}&format=json&limit=${limit}&offset=${offset}`;

        // Add filters if provided
        if (state) url += `&filters[state]=${encodeURIComponent(state)}`;
        if (district) url += `&filters[district]=${encodeURIComponent(district)}`;
        if (commodity) url += `&filters[commodity]=${encodeURIComponent(commodity)}`;

        const response = await axios.get(url);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Mandi API Error:', error.message);
        res.status(500).json({ message: 'Error fetching Mandi prices' });
    }
};

module.exports = {
    getPrices,
    getMandiPrices,
    createPrice,
    updatePrice,
    deletePrice
};
