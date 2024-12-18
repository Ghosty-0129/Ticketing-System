const fs = require('fs');
const path = require('path');

class DataLogger {
    constructor(filePath) {
        this.filePath = filePath || path.join(__dirname, 'dataLog.json');
    }

    // Method to write data to a file
    writeData(vendorTickets, customerData) {
        const data = {
            vendorTickets,
            customerData,
            lastUpdated: new Date().toISOString(),
        };

        try {
            fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
            return { success: true, message: 'Data successfully written to file.' };
        } catch (error) {
            return { success: false, message: 'Error writing data to file.', error: error.message };
        }
    }

    // Method to read data from the file
    readData() {
        if (!fs.existsSync(this.filePath)) {
            return { success: false, message: 'Data file does not exist.' };
        }

        try {
            const fileContent = fs.readFileSync(this.filePath, 'utf-8');
            const data = JSON.parse(fileContent);
            return { success: true, data };
        } catch (error) {
            return { success: false, message: 'Error reading data from file.', error: error.message };
        }
    }

    // Method to update data in the file
    updateData(updates) {
        const currentDataResponse = this.readData();
        if (!currentDataResponse.success) {
            return currentDataResponse;
        }

        const currentData = currentDataResponse.data;

        // Apply updates to the current data
        const updatedData = {
            ...currentData,
            ...updates,
            lastUpdated: new Date().toISOString(),
        };

        // Write updated data back to the file
        return this.writeData(updatedData.vendorTickets || [], updatedData.customerData || []);
    }
}

module.exports = DataLogger;
