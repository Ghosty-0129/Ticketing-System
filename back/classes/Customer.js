class Customer {
    constructor(username, password, customerId) {
        this.username = username;
        this.password = password;
        this.customerId = customerId;
        this.tickets = []; // Array to track tickets purchased
        this.lastRetrievalTime = 0; // Last time customer retrieved tickets
    }

   // Method to get customer information
    getCustomerInfo() {
        return {
            username: this.username,
            customerId: this.customerId,
            tickets: this.tickets.length, // Number of tickets the customer has
        };
    }
}

module.exports = Customer;
