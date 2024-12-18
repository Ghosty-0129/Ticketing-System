
const readline = require('readline');
const fs = require('fs');

const defaultConfig = {
    totalTickets: 100,
    ticketReleaseRate: 5,
    customerRetrievalRate: 3,
    maxTicketCapacity: 200,
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

function validatePositiveInteger(input, defaultValue) {
    const number = parseInt(input);
    if (isNaN(number) || number <= 0) {
        console.log(`Invalid input. Using default value: ${defaultValue}`);
        return defaultValue;
    }
    return number;
}

async function setupConfig() {
    console.log("Welcome to the Ticketing System Setup!");

    const config = { ...defaultConfig };

    config.totalTickets = validatePositiveInteger(
        await askQuestion(`Enter total number of tickets (default: ${defaultConfig.totalTickets}): `),
        defaultConfig.totalTickets
    );

    config.ticketReleaseRate = validatePositiveInteger(
        await askQuestion(`Enter ticket release rate per second (default: ${defaultConfig.ticketReleaseRate}): `),
        defaultConfig.ticketReleaseRate
    );

    config.customerRetrievalRate = validatePositiveInteger(
        await askQuestion(`Enter customer retrieval rate per second (default: ${defaultConfig.customerRetrievalRate}): `),
        defaultConfig.customerRetrievalRate
    );

    config.maxTicketCapacity = validatePositiveInteger(
        await askQuestion(`Enter maximum ticket capacity (default: ${defaultConfig.maxTicketCapacity}): `),
        defaultConfig.maxTicketCapacity
    );

    console.log("\nSystem configured with the following settings:");
    console.log(config);

    fs.writeFileSync('config.json', JSON.stringify(config, null, 2), 'utf8');
    console.log("Configuration saved to 'config.json'.\n");

    rl.close();
    return config;
}

module.exports = { setupConfig };
