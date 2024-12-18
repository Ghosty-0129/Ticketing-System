const fs = require('fs');
const configFilePath = './config.json';

class TicketPool {
    constructor() {
        this.tickets = [];
        this.ticketId = 1; // This will increment with each new ticket added
        this.lastAddTime = {}; // Initialize the lastAddTime property to track the last ticket addition time for each vendor
    }

    // Method to read the configuration from the config.json file
    readConfig() {
        try {
            const rawData = fs.readFileSync(configFilePath, 'utf8');
            return JSON.parse(rawData);
        } catch (error) {
            console.error("Error reading config file:", error);
            return null;
        }
    }

    toJSON() {
        return {
            tickets: this.tickets,
        };
    }

    // Method to add tickets to the pool, associated with a specific vendorId
    addTickets(vendorId, ticketCount) {
        const config = this.readConfig(); // Use `this.readConfig()` to call the method within the class
        if (!config) {
            return { success: false, message: 'Error reading configuration.' };
        }
    
        const { ticketReleaseRate, totalTickets, maxTicketCapacity } = config; // Extract values from the config
        const currentTime = Date.now();
    
        // Check if ticket pool has reached or exceeded the maximum allowed capacity
        if (this.tickets.length >= totalTickets) {
            return { success: false, message: `Cannot add more tickets. Maximum capacity of ${totalTickets} reached.` };
        }
    
        // Check if the ticketCount exceeds the maximum allowed for a single operation
        if (ticketCount > maxTicketCapacity) {
            return { success: false, message: `Cannot add more than ${maxTicketCapacity} tickets in a single operation.` };
        }
    
        // Initialize lastAddTime for the vendor if it doesn't exist
        if (!this.lastAddTime[vendorId]) {
            this.lastAddTime[vendorId] = 0; // Default to 0, meaning the vendor has not added tickets yet
        }
    
        // Check the time difference between current time and last add time for the vendor
        const timeDifference = currentTime - this.lastAddTime[vendorId];
        if (timeDifference < ticketReleaseRate * 1000) {
            const waitTime = ticketReleaseRate - Math.floor(timeDifference / 1000);
            return { success: false, message: `You must wait ${waitTime} seconds before adding more tickets.` };
        }
    
        // Calculate remaining capacity to avoid exceeding the totalTickets limit
        const remainingCapacity = totalTickets - this.tickets.length;
        if (ticketCount > remainingCapacity) {
            return {
                success: false,
                message: `Cannot add ${ticketCount} tickets. Only ${remainingCapacity} slots are available.`,
            };
        }
    
        // Add tickets to the pool
        for (let i = 0; i < ticketCount; i++) {
            const ticketId = this.ticketId++;
            this.tickets.push({ ticketId, vendorId });
        }
    
        // Update the last add time for this vendor
        this.lastAddTime[vendorId] = currentTime;
    
        return { 
            success: true, 
            message: `${ticketCount} tickets added for vendor ${vendorId}.`, 
            ticketCount: this.tickets.length 
        };
    }
    

   // Method to allow customers to buy tickets, adhering to rate and capacity limits
   removeTickets(customerId, count) {
    const config = this.readConfig(); // Use `this.readConfig()` to get config settings
    if (!config) {
        return { success: false, message: 'Error reading configuration.' };
    }

    const { customerRetrievalRate, maxTicketCapacity } = config; // Extract values from config
    console.log('Config loaded:', config); // Debugging line

    const currentTime = Date.now();

    // Log the count and maxTicketCapacity values to ensure they are correct
    console.log('Ticket count:', count, 'Max ticket capacity:', maxTicketCapacity);

    // Check if the count exceeds the maximum allowed for a single operation
    if (count > maxTicketCapacity) {
        console.log('Error: Ticket count exceeds max capacity');
        return { success: false, message: `Cannot buy more than ${maxTicketCapacity} tickets in a single operation.` };
    }

    // Initialize lastRetrievalTime for the customer if it doesn't exist
    if (!this.lastRetrievalTime) {
        this.lastRetrievalTime = {}; // Initialize tracking object
    }

    if (!this.lastRetrievalTime[customerId]) {
        this.lastRetrievalTime[customerId] = 0; // Default to 0, meaning no tickets have been retrieved yet
    }

    // Check the time difference between the current time and the last retrieval time
    const timeDifference = currentTime - this.lastRetrievalTime[customerId];
    if (timeDifference < customerRetrievalRate * 1000) {
        const waitTime = customerRetrievalRate - Math.floor(timeDifference / 1000);
        return { success: false, message: `You must wait ${waitTime} seconds before buying more tickets.` };
    }

    // Check if there are enough tickets available in the pool
    if (this.tickets.length < count) {
        return { 
            success: false, 
            message: `Only ${this.tickets.length} tickets are available, cannot buy ${count}.` 
        };
    }

    // Remove tickets from the pool for the customer
    let removedCount = 0;
    for (let i = 0; i < this.tickets.length && removedCount < count; i++) {
        this.tickets.splice(i, 1);
        removedCount++;
        i--; // Adjust index after removal
    }

    // Update the last retrieval time for the customer
    this.lastRetrievalTime[customerId] = currentTime;

    return { 
        success: true, 
        message: `${removedCount} tickets purchased by customer ${customerId}.`, 
        remainingTickets: this.tickets.length 
    };
}


    // Method to get the current ticket pool
    getTickets() {
        return this.tickets;
    }
}

module.exports = TicketPool;
