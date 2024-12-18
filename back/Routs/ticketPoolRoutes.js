const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Read the config file to get the time interval and other settings
const configFilePath = './config.json';

function readConfig() {
    try {
        const rawData = fs.readFileSync(configFilePath, 'utf8');
        return JSON.parse(rawData);
    } catch (error) {
        console.error("Error reading config file:", error);
        return null;
    }
}

// API route to add tickets to the pool for a specific vendor
router.post('/addTickets', (req, res) => {
    const { vendorId, ticketCount } = req.body;

    // Validate input
    if (!vendorId || !ticketCount || ticketCount <= 0) {
        return res.status(400).json({ message: 'Invalid input. Please provide a valid vendorId and ticketCount.' });
    }

    const ticketPool = req.ticketPool; // Access ticketPool from request object

    // Add tickets
    const result = ticketPool.addTickets(vendorId, ticketCount);

    if (result.success) {
        res.status(200).json({
            message: result.message,
            ticketCount: result.ticketCount
        });
    } else {
        res.status(400).json({ message: result.message });
    }
});

// API route to remove tickets for a specific vendor based on the vendorId and ticketCount
router.post('/removeTickets', (req, res) => {
    const { vendorId, ticketCount } = req.body; // Get vendorId and ticketCount from the request body

    if (!vendorId || !ticketCount || ticketCount <= 0) {
        return res.status(400).json({ message: "Invalid input. Please provide valid vendorId and ticketCount." });
    }

    const ticketPool = req.ticketPool; // Access ticketPool from request object

    // Remove tickets for the specific vendorId
    ticketPool.removeTickets(vendorId, ticketCount);

    res.status(200).json({
        message: `${ticketCount} tickets removed for vendor ${vendorId}.`,
        ticketCount: ticketPool.getTickets().length, // Get current ticket count
    });
});

// API route to get the current number of tickets in the pool
router.get('/ticketPool', (req, res) => {
    const ticketPool = req.ticketPool; // Access ticketPool from request object

    res.status(200).json({
        message: 'Current ticket pool status',
        ticketCount: ticketPool.getTickets().length, // Get current ticket count
        tickets: ticketPool.getTickets(), // Return the ticket objects
    });
});

module.exports = router;
