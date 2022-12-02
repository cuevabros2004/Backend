import  Contenedor  from "../container/containerDb.js";
import { clienteSql } from '../db/clienteSql.js';

const chatFile = new Contenedor(clienteSql, 'chat')

async function controladorPostChat(req, res) {
    res.status(201);
    const objeto = req.body;
    await chatFile.save(objeto);
    console.log(objeto)
    res.json(objeto)
   
}
 
export {controladorPostChat };