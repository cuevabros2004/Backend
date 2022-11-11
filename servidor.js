const express = require('express')
const { routerApi } = require("./routers/routerApi.js")
const { routerWeb } = require("./routers/routerWeb.js")
const { engine } = require('express-handlebars') 


const servidor = express()

  servidor.use(express.json())
  servidor.use(express.urlencoded({ extended: true }))

  servidor.use('/api/productos', routerApi)
  servidor.use('/', routerWeb)
  servidor.use('/views', express.static('views'))

  //handlebars
  servidor.engine('handlebars', engine())   
  servidor.set('view engine', 'handlebars')
  
  function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = servidor.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
  }

  module.exports = { conectar }
