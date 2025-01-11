const http = require('http');
const { Server } = require('socket.io');
const readline = require('readline');

// Create HTTP server and Socket.IO server
const server = http.createServer();
const io = new Server(server);

const PORT = 3000;

// Readline interface for server input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Event when a client connects
io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Listen for messages from clients
    socket.on('message', (msg) => {
        console.log(`Message from client (${socket.id}): ${msg}`);
    });

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

// Broadcast message to all connected clients
const broadcastMessage = () => {
    rl.question('Enter a message to broadcast: ', (message) => {
        io.emit('broadcast', message);
        broadcastMessage(); // Recursive call for continuous input
    });
};

// Start server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    broadcastMessage(); // Start server input loop
});
