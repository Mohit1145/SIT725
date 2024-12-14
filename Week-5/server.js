const http = require('http');
const fs = require('fs');
const path = require('path');
const { parse } = require('querystring');
const { connectToDatabase } = require('./databaseConnection');
const { getSalonCollection } = require('./models/salonModel');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
    const filePath = path.join(__dirname, 'views', req.url === '/' ? 'addSalon.html' : req.url);

    // Serve the Add Salon Page
    if (req.method === 'GET' && req.url === '/') {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    }

    // Serve the Display Salons Page
    else if (req.method === 'GET' && req.url === '/displaySalons.html') {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    }

    // Handle form submission to add a salon
    else if (req.method === 'POST' && req.url === '/addSalon') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', async () => {
            const data = parse(body); // Parse form data
            const salon = {
                name: data.name,
                location: data.location,
                services: data.services,
            };

            try {
                const collection = getSalonCollection();
                await collection.insertOne(salon);
                res.writeHead(302, { Location: '/displaySalons.html' }); // Redirect to display page
                res.end();
            } catch (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Failed to add salon: ' + err.message);
            }
        });
    }

    // Handle API call to fetch salon data
    else if (req.method === 'GET' && req.url === '/api/salons') {
        try {
            const collection = getSalonCollection();
            const salons = await collection.find({}).toArray();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(salons));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Failed to retrieve salons: ' + err.message);
        }
    }

    // Serve static files
    else if (req.method === 'GET') {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(content);
            }
        });
    }

    // Handle invalid routes
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

connectToDatabase().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database:', err.message);
});
