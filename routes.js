const express = require('express')
const routes = express.Router()
const {index} = require('./src/controllers/homeController')
const {loginRequired} = require('./src/middleware/middleware')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')


//       route | midleware  
routes.get('/',index)

//Rotas de login
routes.get('/login/index', loginController.index)
routes.post('/login/register', loginController.register)
routes.post('/login/login', loginController.login)
routes.get('/login/logout', loginController.logout)

//rotas de contato
routes.get('/contato/index',loginRequired ,contatoController.index)
routes.post('/contato/register', loginRequired, contatoController.register);
routes.get('/contato/index/:id', loginRequired, contatoController.editIndex)
routes.post('/contato/edit/:id', loginRequired, contatoController.edit)
routes.get('/contato/delete/:id', loginRequired, contatoController.delete)




module.exports = routes