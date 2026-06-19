// Simple WebSocket server using 'ws' package
const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server
const server = http.createServer();

// Create a WebSocket server bound to /ws
const wss = new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', (message) => {
    console.log('Received:', message);
    // Echo the message back to the client
    ws.send(`Echo: ${message}`);
  });
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('WebSocket server listening on ws://localhost:3000/ws');
}); 