import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';


import ContenedorMemoria from '../contenedores/ContenedorMemoria.js';
import ContenedorArchivo from '../contenedores/ContenedorArchivo.js';
import ContenedorSQL from '../contenedores/ContenedorSQL.js';
import config from './config.js';

//--------------------------------------------
// instancio servidor, socket y api
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

// const memoria = new ContenedorMemoria();
// const archivo = new ContenedorArchivo('../mensajes.txt');

const productosApi = new ContenedorSQL(config.mariaDb, 'productos')
const mensajesApi = new ContenedorSQL(config.sqlite3, 'mensajes')

app.use(express.static('../public'));

app.get('/', (req, res) => {
    res.send('index.html');
})

//--------------------------------------------
// configuro el socket

// const guardarTxt = async (obj) => {
//     await archivo.guardar(obj)
// }

io.on('connection', async socket => {
    //tabla de productos
    socket.on('producto', async data => {
        await productosApi.guardar(data);
    });
    const todosProductos = await productosApi.listarAll();
    socket.emit('productos', todosProductos);

    //chat global
    
    const mensajes = await mensajesApi.listarAll()
    socket.emit('mensajes', mensajes);

    socket.on('nuevoMensaje', async (data) => {
        await mensajesApi.guardar(data)
        io.sockets.emit('mensajes', mensajes);
    });

    
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
