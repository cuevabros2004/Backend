const { randomUUID } = require('crypto');
const { Contenedor } = require("../container/container.js")
const fs = require("fs");

const prods = new Contenedor('productos.txt')

function controladorPostProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    console.log(req.body)
    objeto.id = randomUUID();
    prods.save(objeto);
    res.json(objeto)
}

async function controladorGetProductos(req, res) {
    const productos = await prods.getAll();
    res.json(productos);
    }

async function controladorGetProductosSegunId({ params: { id } }, res) {
    const productos = await prods.getAll();
    const buscado = productos.find(c => c.id === id);
    if (!buscado) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        res.json(buscado);
    }
}

async function controladorPutProductosSegunId({ body, params: { id } }, res) {
    const productos = await prods.getAll();
    const indiceBuscado = productos.findIndex(c => c.id === id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        productos[indiceBuscado] = body;

        try {
            //objeto.id = id
            await fs.promises.writeFile('productos.txt', JSON.stringify(productos, null, 2))
        }
        catch(error){
            error => { throw error}
        }

        res.json(body);
    }
}


async function controladorDeleteProductosSegunId({ params: { id } }, res) {
    const productos = await prods.getAll();
    const indiceBuscado = productos.findIndex(c => c.id === id);
    if (indiceBuscado === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con ese id (${id})` });
    } else {
        const borrados = productos.splice(indiceBuscado, 1);
        // res.sendStatus(204)

        try {
            //objeto.id = id
            await fs.promises.writeFile('productos.txt', JSON.stringify(productos, null, 2))
        }
        catch(error){
            error => { throw error}
        }

        res.json(borrados[0]);
    }
}

exports.controladorGetProductos = controladorGetProductos;
exports.controladorPostProductos = controladorPostProductos;
exports.controladorGetProductosSegunId = controladorGetProductosSegunId;
exports.controladorPutProductosSegunId = controladorPutProductosSegunId;
exports.controladorDeleteProductosSegunId = controladorDeleteProductosSegunId;