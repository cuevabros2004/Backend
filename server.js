import express  from 'express'
import { routerApi } from "./routers/routerApi.js"
import { routerWeb } from "./routers/routerWeb.js"
import { engine } from 'express-handlebars'  //handlebars
import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'
import  Contenedor  from "./container/containerDb.js"
import { log } from 'console'
import { clienteSql } from './db/clienteSql.js';

const servidor = express()
const httpServer = new HttpServer(servidor)
const io = new IOServer(httpServer)

//Middlewares para resolver los datos que viene por el Post
//Si viene por un Json o si viene de un formulario (Form)
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))

//Middlewares para los routers
servidor.use('/api/productos', routerApi)
servidor.use('/', routerWeb)
servidor.use('/views', express.static('views'))
servidor.use(express.static('public'))


//handlebars
servidor.engine('handlebars', engine())
servidor.set('view engine', 'handlebars')


function conectar(puerto = 0) {
  return new Promise((resolve, reject) => {
    const servidorConectado = httpServer.listen(puerto, () => {
      resolve(servidorConectado)
    })
  })
}

const contenedor = new Contenedor(clienteSql, 'productos');
const contenedorChat = new Contenedor(clienteSql, 'chat');

io.on('connection', async (socket) => {
  // "connection" se ejecuta la primera vez que se abre una nueva conexión
  //console.log('Usuario conectado')

  const productos = await contenedor.getAll();

    if (productos) {
      let mensajeProductos = ""
      productos.forEach(p => {
        mensajeProductos = mensajeProductos + `<tr><td>${p.title}</td> <td>${p.price}</td> <td><img width="70px" src=${p.thumbnail} alt="Imagen producto"/></td><tr>`
      });
      socket.emit('mensajesActualizados', mensajeProductos);
    }


    socket.on('mensajes', data => {
      const mensajes = { socketid: socket.id, mensaje: data }
      io.sockets.emit('mensajesActualizados', `<tr><td>${data.title}</td> <td>${data.price}</td> <td><img width="70px" src=${data.thumbnail} alt="Imagen producto"/></td><tr>`);
    })

    const chat = await contenedorChat.getAll();
    
    if (chat) {
      let mensajeChat = ""
      chat.forEach(c => {
        mensajeChat = mensajeChat + `<strong style="color: blue">${c.email}</strong> - [<h15 style="color: brown"> ${c.fecha}</h15>]: <h15 style="color: green; font-family: italic"> ${c.mensaje}</h15></br>`
      });
      socket.emit('mensajesChatActualizados', mensajeChat);
    }

    socket.on('mensajesChat', data => {
      const mensajesChat = { socketid: socket.id, mensajesChat: data }
      io.sockets.emit('mensajesChatActualizados', `<strong style="color: blue">${data.email}</strong> - [<h15 style="color: brown"> ${data.fecha}</h15>]: <h15 style="color: green; font-family: italic"> ${data.mensaje}</h15></br>`);
    })

  })


export  { conectar }















