const express = require('express');
const { Router } = express; 

/* new router */
const routerProductos = new Router(); 

/* middleware */
routerProductos.use(express.urlencoded({extended: true}));
routerProductos.use((req, res, next) => {
    
})

/* rutas */
routerProductos.get('/productos', (req, res) => {
    // res.json(productos)
    res.send("hola mundo")
});

routerProductos.get('/productos/:id', (req, res) => {
    const id = req.params.id; 
    const productoId = productos.find(x => x.id === id);
    
    if(!productoId) return res.status(404).send();

    return res.json(productoId);
});

routerProductos.post('/productos', (req, res) => {
    const newProducto = req.body
    productos.push(newProducto)
    return res.json(newProducto)
});

routerProductos.put('/productos/:id', (req, res) => {
    const id = req.params.id; 
    const productoId = productos.find(x => x.id === id);
    
    if(!productoId) return res.status(404).send();
});

routerProductos.delete('/productos/:id', (req, res) => {
    const id = req.params.id; 
    const productoIndex = productos.findIndex(x => x.id === id);
    
    if(productoIndex === -1) return res.status(404).send();

    productos.splice(productoIndex, 1);

    return res.send();
});

    /* memoria */
    const productos = []; 

    /* productos cargados de prueba */

    const producto1 = 
        {
        title: "pipa dunhill",
        price: "20000",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-pe01.jpg?alt=media&token=3a1addb3-192a-46c8-94b8-2a1a0560c3b9",
        id: 1
        };
    const producto2 = 
        {
        title: "pipa peterson",
        price: "15000",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-pe01.jpg?alt=media&token=3a1addb3-192a-46c8-94b8-2a1a0560c3b9",
        id: 2
        };

    productos.push(producto1, producto2)
    console.log(productos)

module.exports = routerProductos;
