const express = require('express');
const router = express.Router();
const Customer = require('../classes/Customer'); // Import the Customer class



// Route to create a customer
router.post('/create-customer', (req, res) => {
    const { username, password, customerId } = req.body;

    if (!username || !password || !customerId) {
        return res.status(400).json({ message: 'Username, password, and customerId are required.' });
    }

    // Access the customers array from the request object
    const customers = req.customers;

    // Check if the username already exists
    const existingCustomer = customers.find(customer => customer.username === username);
    if (existingCustomer) {
        return res.status(400).json({ message: 'Username already exists. Please choose a different username.' });
    }

    // Create a new customer instance
    const newCustomer = new Customer(username, password, customerId);

    // Store the created customer in the `customers` array
    customers.push(newCustomer);

    return res.status(201).json(newCustomer.getCustomerInfo());
});

// Route to get all customers
router.get('/get-customers', (req, res) => {
    const customers = req.customers; // Access the customers array from the request object
    const allCustomers = customers.map(customer => customer.getCustomerInfo()); // Extract customer information
    return res.status(200).json(allCustomers);
});

// Route for customer login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Access the customers array from the request object
    const customers = req.customers;

    // Find the customer by username
    const customer = customers.find(c => c.username === username);

    if (!customer) {
        return res.status(404).json({ message: 'Customer not found.' });
    }

    // Check if the password matches
    if (customer.password !== password) {
        return res.status(401).json({ message: 'Invalid password.' });
    }

    return res.status(200).json({ message: 'Login successful.', customer: customer.getCustomerInfo() });
});

module.exports = router; // Export the router to be used in other files
