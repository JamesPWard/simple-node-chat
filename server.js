//Modules
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 1017}),
    http = require('http'),
    httpPort = 1337;

//Chat variables
var messages = [];
var activeUsers = [];

http.createServer((req, res) => {

    res.write(`${req.url} says`);
    res.end('Hello World');
    console.log(`Request to ${req.url} successful`);

}).listen(httpPort);

wss.on('connection', (ws) => {

    //Add to active users
    console.log('Running');

    //Message received
    ws.on('message', (message) => {

        //Parse message to JSON obj
        message = JSON.parse(message);

        //Process message
        switch (message.type) {
            case "user":
                //If object is type user add to client list
                activeUsers.push(message);
                break;
            case "message":
                //Log message to console
                sendToChat(message);
                console.log(`Message received from ${message.username}: ${message.message}`);
                break;
        }
    });

    ws.on('close', (connection) => {
        //Remove client from list
        console.log('Client disconnected');
    });

    function sendToChat(message){
        wss.clients.forEach((client) => {
            if(client.readyState == ws.OPEN){
                client.send(JSON.stringify(message));
            }
        });
    }

});