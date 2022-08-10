const express = require('express');
const classProductos = require('../api/classProductos.js')

/* new router */
const routerProductos = express.Router(); 

/* middleware */
routerProductos.use(express.urlencoded({extended: true}));
routerProductos.use(express.json());

/* import de la clase */
const productosApi = new classProductos();

/* rutas */

/* trae todo el array de objetos*/
routerProductos.get('/productos', (req, res) => {
    const data = productosApi.listarAll();
    data ? res.json(data) : res.status(404).send();
});
/* trae el objeto con el id del path, en caso de no tener ese id en el array devuelve un 404*/
routerProductos.get('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const respuesta = productosApi.listar(id);
    respuesta ? res.json(respuesta) : res.status(404).send(); 
});
/* agrega un producto al array y le otorga un id */
routerProductos.post('/productos', (req, res) => {
    const form = req.body;
    productosApi.guardar(form);
    return res.json(productosApi.listarAll());
});
/* actualiza informacion a un objeto segun su id, en caso de no existir arroja un error */
routerProductos.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    const obj = req.body;
    productosApi.actualizar(obj, id)

    if(productosApi.actualizar(obj, id) == null) res.status(404).send();

    return res.json(productosApi.listarAll());
});
/* borra el objeto que coincide con el id actual, caso de no existir retorna un error 404 */
routerProductos.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id); 
    productosApi.borrar(id);
    if(productosApi.borrar(id) == null) res.status(404).send();
    return res.json(productosApi.listarAll());
});

module.exports = routerProductos;
