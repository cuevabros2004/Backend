const express = require('express')
const { Contenedor }   = require('./archivos.js') 

const servidor = express()
const contenedor = new Contenedor('productos.txt')

function getAleatorio() {
    return parseInt(Math.random() * 3) + 1
}

servidor.get('/', async (peticion, respuesta) => {
    respuesta.send('<h1>Bienvenido al Desafío SERVIDOR CON EXPRESS</h1>')
})

servidor.get('/productos',async (peticion, respuesta) =>{
    respuesta.send( await contenedor.getAll())
})

//servidor.get('/despedida', (peticion, respuesta) =>{
 //   respuesta.json({"codigo": "1", "nombreProducto": "SALÓN DE FIESTAS"})
//})

servidor.get('/productosRandom',async (peticion, respuesta) =>{
    respuesta.send( await contenedor.getById(getAleatorio()))
})



function conectar (puerto = 0   ){
    return new Promise((resolve, reject) =>{
        const servidorConectador = servidor.listen(puerto, err =>{
            if (err) 
                reject(err)
                //console.log("fallo" + err)
            else
                resolve(servidorConectador)
                //console.log(`conectado al puerto ${servidorConectado.address().port}`)
        })
} )
}

module.exports = { conectar }


 
