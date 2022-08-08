const express = require("express");
const routerProductos = require("./routes/Rutas.js");
const app = express();
const PORT = 8080;

/* middlewares */ 
app.use(express.json());
app.use(express.text());
app.use("/api", routerProductos)

/* home desafio */
app.get('/', (req, res) => {
    res.send('<h1 style="color:blue;">Desafio Express! acceda a: </h1> <ul><li>/api/productos</li><li>/api/productos/*id*</li><li></li></ul></h1>')
});



/* server listen */
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));




