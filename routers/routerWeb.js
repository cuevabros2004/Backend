import { Router } from 'express';
import { controladorWeb } from "../controllers/controladorWeb.js";
import { controladorWebListadoProductos } from "../controllers/controladorWeb.js";
import { controladorPostWebProductos } from "../controllers/controladorWeb.js";


const routerWeb = Router();

routerWeb.get('/', controladorWeb);
routerWeb.get('/productos', controladorWebListadoProductos);
routerWeb.post('/productos', controladorPostWebProductos);

 
export {routerWeb };

