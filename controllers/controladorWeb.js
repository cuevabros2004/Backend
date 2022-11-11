const { Contenedor } = require("../container/container.js")
const { randomUUID } = require('crypto');

const prods = new Contenedor('productos.txt')

function controladorWeb(req, res) {
    res.render('formulario')
}

async function controladorPostWebProductos(req, res) {
    res.status(201);
    const objeto = req.body;
    objeto.id = randomUUID();
    await prods.save(objeto);
    
    res.render('formulario');
}

async function controladorWebListadoProductos (req, res){
    const productos = await prods.getAll()
    res.render('listado', {productos, hayProductos:productos?productos.length:null})
}

exports.controladorWeb = controladorWeb;
exports.controladorWebListadoProductos = controladorWebListadoProductos;
exports.controladorPostWebProductos = controladorPostWebProductos;

