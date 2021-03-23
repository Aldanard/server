const express = require('express');
const app = express();
const http = require ('http');
const WebSocket = require('ws');
const port = 3000;
const server = http.createServer(express);
const wss = new WebSocket.Server ({server})
const path = require ('path');
app.use(express.static(path.join(__dirname, 'public')));




wss.on('connection', function connection(ws){
ws.on('message', function incoming(data){
    wss.clients.forEach(function each(client){
        if (client != ws && client.readyState == WebSocket.OPEN){
            client.send(data);
        }
    });
});
});
server.listen(port, function()
{
    console.log(`Server is listening on ${port}!`)
})
