const express = require('express');
const router = express.Router();

const DataLogger = require('../classes/DataLogger');
const dataLogger = new DataLogger();



// Endpoint to log ticket pool and customer data to file
router.post('/logData', (req, res) => {
    const { vendorTickets, customerData } = req.body;

    if (!vendorTickets || !customerData) {
        return res.status(400).json({ success: false, message: 'vendorTickets and customerData are required.' });
    }

    const response = dataLogger.writeData(vendorTickets, customerData);
    res.status(response.success ? 200 : 500).json(response);
});

// Endpoint to retrieve data from the log file
router.get('/getData', (req, res) => {
    const response = dataLogger.readData();
    res.status(response.success ? 200 : 500).json(response);
});

// Endpoint to update data in the log file
router.put('/updateData', (req, res) => {
    const updates = req.body;

    if (!updates) {
        return res.status(400).json({ success: false, message: 'Updates are required.' });
    }

    const response = dataLogger.updateData(updates);
    res.status(response.success ? 200 : 500).json(response);
});

module.exports = router;
