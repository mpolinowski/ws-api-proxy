var WebSocketServer = require('ws').Server;

wss = new WebSocketServer({port: 8010});

console.log("Websocket server 1 started on port 8010");


wss.on('connection', function(ws) {
        ws.on('message', function(message) {
        console.log('Received from client: %s', message);
        ws.send('Server 1 received from client: ' + message);
    });
});