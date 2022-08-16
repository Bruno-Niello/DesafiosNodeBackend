const express = require("express");
const classProductos = require('./api/classProductos.js')
const { engine } = require ('express-handlebars');
const app = express();
const PORT = 8080;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/* clases */
const productosApi = new classProductos();

/* handlebars */
app.set('view engine', 'handlebars');
app.set('views', './views');
app.engine('handlebars', engine());


/* HTML */
app.use(express.static('public'))

/* home desafio */
app.get('/', (req, res) => {
    res.send('index');
});

/* Rutas */

app.get('/productos', (req, res) => {
    const data = productosApi.listarAll();
    res.render('main', {layout: 'index', data: JSON.stringify(data, null, 2)})
});
app.post('/productos', (req, res) => {
    const form = req.body;
    productosApi.guardar(form);
});

/* server listen */
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));




