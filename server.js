const WebSocketServer = require('ws').server, wss = new WebSocketServer({port: 1337});
const http = require('http'), httpPort = 1337;

http.createServer((req, res) => {

    res.write(`${req.url} says`);
    res.end('Hello World');
    console.log(`Request to ${req.url} successful`);

});

wss.on('connection', (ws) =>
{

});