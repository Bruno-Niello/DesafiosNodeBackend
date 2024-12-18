import express from "express"
import { PrismaClient } from '@prisma/client';

const app = express(); 

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const prisma = new PrismaClient();

app.get("/", (req, res) => {
    res.status(200).send("Buenardopolis, para ver productos usa /productos bye broder")
})

app.get("/productos", async (req, res) => {
    const productos = await prisma.productos.findMany()
    if(productos.length > 0) {
        res.status(200).json({ 
            message: `Se encontraron ${productos.length} productos`,
            productos: productos
        })
    } else {
        res.status(404).send({ message: "productos no encontrados", productos: [] })
    }
})

app.get("/productos/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    if(!id) {
        res.status(404).send({ message: "ID no enviado" })
    }
    const objeto = await prisma.productos.findUnique({
        where: {
            id: id
        }
    })
    if(!objeto){
        res.status(404).send({ message: `Producto ID:${id} no encontrado`})
    }
    res.status(200).json({
        meesage: "Producto encontrado",
        producto: objeto
    })
})

app.post("/productos", async (req, res) => {
    if (!req.body) {
        res.status(404).send({
            message: "No enviaste ningun producto"
        })
    }
    const producto = req.body;

    if(!producto.talle || !producto.color) {
        res.status(404).send({
            message: "Este no es un producto valido"
        })
    }

    const new_product = await prisma.productos.create({
        data: producto 
    })

    const productos = await prisma.productos.findMany()

    res.status(200).send({
        message: `Producto ID: ${new_product.id} guardado correctamente en la base de datos`,
        productos: productos
    })
})

app.delete("/productos/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    if(!id) {
        res.status(404).send({ message: "ID no enviado" })
    }

    const producto = await prisma.productos.findUnique({
        where: {
            id: id
        }
    })
    if(!producto) {
        res.status(404).send({ message: "Ese producto no existe" })
    }
    await prisma.productos.delete({
        where: {
            id: id
        }
    })
    res.status(200).send({ message: `El producto con el ID:${id} fue eliminado exitosamente` })
})

app.put("/productos/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    if(!id) {
        res.status(404).send({ message: "ID no enviado" })
    }

    const producto = await prisma.productos.findUnique({
        where: {
            id: id
        }
    })
    if(!producto) {
        res.status(404).send({ message: "Ese producto no existe" })
    }

    const { talle, color, tipo } = req.body;

    const update_product = await prisma.productos.update({
        where: {
            id: id
        },
        data: {
            color: color ? color : producto.color,
            talle: talle ? talle : producto.talle,
            tipo: tipo ? tipo : producto.tipo
        }
    })

    res.status(200).send({
        message: "Producto actualizado correctamente",
        producto: update_product
    })
})

app.listen(3000, () => {
    console.log("estamos escuchando el puerto 3000 gatovich")
})