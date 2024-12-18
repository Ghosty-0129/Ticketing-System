const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const vendorRoutes = require('./Routs/vendorRoutes');
const configRoutes = require('./Routs/configRoutes');
const TicketPool = require('./classes/TicketPool ');
const ticketPoolRoutes = require('./Routs/ticketPoolRoutes');
const dataLoggerRoutes = require('./Routs/dataLoggerRoutes');
const customerRoutes = require('./Routs/customerRoutes');

// File paths
const DATA_FILE = path.join(__dirname, 'data.json');

let customers = [];
let vendors = [];
let ticketPool = new TicketPool();

// Middleware to attach shared objects
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.customers = customers;
    req.vendors = vendors;
    req.ticketPool = ticketPool;
    next();
});

// Save data to file
function saveData() {
    const data = {
        customers,
        vendors,
        ticketPool: ticketPool.toJSON(), // Ensure `TicketPool` has a `toJSON` method
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Data saved successfully.');
}

// Load data from file
function loadData() {
    if (fs.existsSync(DATA_FILE)) {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        customers = data.customers || [];
        vendors = data.vendors || [];
        ticketPool = new TicketPool(data.ticketPool); // Ensure `TicketPool` can initialize from data
        console.log('Data loaded successfully.');
    } else {
        console.log('No data file found. Starting fresh.');
    }
}

// API to save data to the file
app.post('/api/save-data', (req, res) => {
    try {
        saveData();
        res.status(200).json({ message: 'Data saved successfully.' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Failed to save data.', error: error.message });
    }
});

// API to load data from the file
app.get('/api/load-data', (req, res) => {
    try {
        loadData();
        res.status(200).json({ message: 'Data loaded successfully.', data: { customers, vendors, ticketPool } });
    } catch (error) {
        console.error('Error loading data:', error);
        res.status(500).json({ message: 'Failed to load data.', error: error.message });
    }
});

// Use the vendor routes for handling vendor-related requests
app.use('/api/vendors', vendorRoutes);
app.use('/api/config', configRoutes);
app.use('/api/ticketpool', ticketPoolRoutes);
app.use('/api/dataLogger', ticketPoolRoutes);
app.use('/api/customer', customerRoutes);

// Load data at startup
loadData();

// Save data on exit
process.on('SIGINT', () => {
    saveData();
    process.exit();
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
