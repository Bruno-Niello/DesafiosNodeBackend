import express from 'express';
import ContenedorDB from './contenedorDB.js';
import config from './config.js';
import knex from 'knex';

const app = express();
const DB = new ContenedorDB('mensajes', config.mariaDb);

// app.post('/', async (req, res)=>{
//     let obj = req.body
//     const x = await DB.guardar(obj);
//     res.json(x);
// })

const conection = knex(config.mariaDb);

app.post('/', async (req, res)=>{
    const x = await req.body
    console.log(x)
    console.log(req.body)
    // conection('mefe').insert(x).then(()=>console.log("datos enviados"))
    res.json("enviado")
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
});

server.on('error', error => console.log(`Error en servidor ${error}`));