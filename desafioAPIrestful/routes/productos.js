const express = require('express');

/* new router */
const routerProductos = express.Router(); 

/* middleware */
routerProductos.use(express.urlencoded({extended: true}));
routerProductos.use(express.json());


/* rutas */

/* trae todo el array de objetos*/
routerProductos.get('/productos', (req, res) => {
    res.json(productos)
});
/* trae el objeto con el id del path, en caso de no tener ese id en el array devuelve un 404*/
routerProductos.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const productoId = productos.find(x => x.id === id);
    
    if(!productoId) return res.status(404).send();

    return res.json(productoId);
});
/* agrega un producto al array y le otorga un id */
routerProductos.post('/productos', (req, res) => {
    const form = req.body;
    const id = parseInt(productos.length) + 1;
    const newProducto = {...form, id: id};
    productos.push(newProducto);
    return res.json(newProducto);
});
/* actualiza informacion a un objeto segun su id, en caso de no existir arroja un error */
routerProductos.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const productoId = productos.find(x => x.id === id);
    const { name } = req.body;
    const { price } = req.body;
    const { thumbnail } = req.body;
    
    productoId.name = name;
    productoId.price = price;
    productoId.thumbnail = thumbnail;

    if(!productoId) res.status(404).send();

    return res.json(productoId)
});
/* borra el objeto que coincide con el id actual, caso de no existir retorna un error 404 */
routerProductos.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const productoIndex = productos.findIndex(x => x.id === id);
    
    if(productoIndex === -1) return res.status(404).send();

    productos.splice(productoIndex, 1);

    return res.send();
});

    /* memoria */
        /* productos cargados de prueba */
const productos = [
    {
        title: "pipa dunhill",
        price: "20000",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-pe01.jpg?alt=media&token=3a1addb3-192a-46c8-94b8-2a1a0560c3b9",
        id: 1
    },
    {
        title: "pipa peterson",
        price: "15000",
        thumbnail: "https://firebasestorage.googleapis.com/v0/b/mefe-pipas.appspot.com/o/pipa-pe01.jpg?alt=media&token=3a1addb3-192a-46c8-94b8-2a1a0560c3b9",
        id: 2
    }
]; 


module.exports = routerProductos;
