var WebSocketServer = require('ws').Server;

wss = new WebSocketServer({port: 8030});

console.log("Websocket server 2 started on port 8030");


wss.on('connection', function(ws) {
        ws.on('message', function(message) {
        console.log('Received from client: %s', message);
        ws.send('Server 2 received from client: ' + message);
    });
});