const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 1017}),
    http = require('http'),
    httpPort = 1337;

http.createServer((req, res) => {

    res.write(`${req.url} says`);
    res.end('Hello World');
    console.log(`Request to ${req.url} successful`);

}).listen(httpPort);

wss.on('connection', (ws) => {

    //Message received
    ws.on('message', (message) => {
        console.log(message);
    });

});