var WebSocketServer = require('ws').Server;

wss = new WebSocketServer({port: 8040});

console.log("Websocket server 3 started on port 8040");


wss.on('connection', function(ws) {
        ws.on('message', function(message) {
        console.log('Received from client: %s', message);
        ws.send('Server 3 received from client: ' + message);
    });
});