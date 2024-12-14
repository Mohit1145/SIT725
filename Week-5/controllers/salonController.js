const { getSalonCollection } = require('../models/salonModel');
const { parse } = require('querystring');

const handleAddSalon = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // Convert Buffer to string
    });
    req.on('end', async () => {
        const data = parse(body); // Parse form data
        const salon = {
            name: data.name,
            location: data.location,
            services: data.services
        };
        try {
            const collection = getSalonCollection();
            await collection.insertOne(salon);
            res.writeHead(302, { Location: '/displaySalons.html' });
            res.end();
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Failed to add salon: ' + err.message);
        }
    });
};

const handleGetSalons = async (res) => {
    try {
        const collection = getSalonCollection();
        const salons = await collection.find({}).toArray();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(salons));
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Failed to retrieve salons: ' + err.message);
    }
};

module.exports = { handleAddSalon, handleGetSalons };
