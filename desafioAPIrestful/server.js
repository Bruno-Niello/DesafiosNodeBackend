const express = require("express");
const routerProductos = require("./routes/productos.js");
const app = express();
const PORT = 8080;

/* middlewares */ 
app.use("/api", routerProductos)

/* home desafio */
app.get('/', (req, res) => {
    res.send('<h1 style="color:blue;">Desafio Express! acceda a: </h1> <ul><li>/api/productos</li><li>/api/productos/*id*</li><li>/index.html para acceder al formulario de carga de objetos!</li></ul></h1>')
});

/* HTML */
app.use(express.static('public'))


/* server listen */
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));




