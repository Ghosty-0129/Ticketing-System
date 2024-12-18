class Vendor {
    constructor(username, password, vendorId) {
        this.username = username;
        this.password = password;
        this.vendorId = vendorId;
    }

    // Method to add a vendor object to the array
    addVendor(vendor) {
        this.vendorObjects.push(vendor);
    }

    // Method to display vendor information
    getVendorInfo() {
        return {
            username: this.username,
            vendorId: this.vendorId,
        };
    }
}

module.exports = Vendor;
