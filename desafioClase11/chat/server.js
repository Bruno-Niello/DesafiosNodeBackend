const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})

const messages = [
    {author: "mefe", text: "hola!"},
    {author: "bruno", text: "holis"}
];

io.on('connection', socket => {
    console.log('nuevo cliente conectado');
    //carga el historial de mensajes
    socket.emit('messages', messages);
    //mensaje
    socket.on('new-message', data => {
        messages.push(data);
        //este lo envia por webpack
        io.sockets.emit('messages', messages)
    })
});

httpServer.listen(8080, ()=> console.log('server is running'));
