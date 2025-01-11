const { io } = require('socket.io-client');
const readline = require('readline');

// Create readline interface for client input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const socket = io('http://localhost:3000');

// Handle connection
socket.on('connect', () => {
    console.log(`Connected to server as ${socket.id}`);

    // Prompt for user input to send messages
    const sendMessage = () => {
        rl.question('Enter a message to send to the server: ', (message) => {
            socket.emit('message', message);
            sendMessage(); // Recursive call for continuous input
        });
    };

    sendMessage();
});

// Listen for broadcast messages from the server
socket.on('broadcast', (msg) => {
    console.log(`Broadcast from server: ${msg}`);
});

// Handle disconnection
socket.on('disconnect', () => {
    console.log('Disconnected from server.');
});
