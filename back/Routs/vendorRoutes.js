const express = require('express');
const router = express.Router();
const Vendor = require('../classes/Vendor'); // Import the Vendor class

// Route to create a vendor
router.post('/create-vendor', (req, res) => {
    const { username, password, vendorId } = req.body;
    
    if (!username || !password || !vendorId) {
        return res.status(400).json({ message: 'Username, password, and vendorId are required.' });
    }

    // Access the vendors array from the request object
    const vendors = req.vendors;

    // Create a new vendor instance
    const newVendor = new Vendor(username, password, vendorId);

    // Store the created vendor in the `vendors` array
    vendors.push(newVendor);

    return res.status(201).json(newVendor.getVendorInfo());
});

// Route for vendor login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Access the vendors array from the request object
    const vendors = req.vendors;

    // Find the vendor by username
    const vendor = vendors.find(v => v.username === username);

    if (!vendor) {
        return res.status(404).json({ message: 'Vendor not found.' });
    }

    // Check if the password matches
    if (vendor.password !== password) {
        return res.status(401).json({ message: 'Invalid password.' });
    }

    return res.status(200).json({ message: 'Login successful.', vendor: vendor.getVendorInfo() });
});

// Route to get all vendors
router.get('/get-vendors', (req, res) => {
    const vendors = req.vendors; // Access the vendors array from the request object
    const allVendors = vendors.map(vendor => vendor.getVendorInfo()); // Extract vendor information
    return res.status(200).json(allVendors);
});

module.exports = router; // Export the router to be used in other files
