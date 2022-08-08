const express = require('express');
const live = require('./contenedor');
const app = express();





const server = app.listen(8080, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));

const promise = async () => {

    const productos = await live; 

    const aleatorio = () => {
        let random = productos[Math.floor(Math.random() * productos.length)];
        return random
    }
    
    app.get('/', (req, res) => {
        res.send('<h1 style="color:blue;">Desafio Express! acceda a /productos y /productoRandom</h1>')
    });

    app.get('/productos', (req, res) => {
        res.send(`${JSON.stringify(productos, null, 2)}`)
    });

    app.get('/productoRandom', (req, res) => {
        res.send(`${JSON.stringify(aleatorio())}`)
    });
    
}

promise();















// productos.forEach(element => {
//     `
//         <h3>${element.title}</h3>
//         <h4>${element.price}</h4>
//         <h4>${element.id}</h4>
//         <img src="${element.thumbnail}"/>`   
// })