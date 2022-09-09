import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as Socket } from 'socket.io';

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

io.on("connection", async (socket) => {
    const productos = await productosApi.listarAll();
    const mensajes = await mensajesApi.listarAll();
  
    socket.emit("mensajes", mensajes);
    socket.on("nuevoMensaje", async (x) => {
      let horaActual = new Date().getHours();
      let minActual = new Date().getMinutes();
      x.hora = horaActual + ":" + minActual;
      mensajes.push(x);
      await mensajesApi.guardar(x);
      io.sockets.emit("mensajes", mensajes);
      await mensajesApi.desconectar();
    });
  
    //productos
    socket.emit("productos", productos);
    socket.on("new-producto", async (producto) => {
      productos.push(producto);
      await productosApi.guardar(producto);
      io.sockets.emit("productos", productos);
      await productosApi.desconectar();
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
