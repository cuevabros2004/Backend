const express = require('express');
const { controladorWeb } = require("../controllers/controladorWeb.js");
const { controladorWebListadoProductos } = require("../controllers/controladorWeb.js");
const { controladorPostWebProductos } = require("../controllers/controladorWeb.js");

const routerWeb = express.Router();

routerWeb.get('/', controladorWeb);


routerWeb.post('/productos', controladorPostWebProductos);
routerWeb.get('/productos', controladorWebListadoProductos)


//servidor.get('/', controladorWeb);

exports.routerWeb = routerWeb;


