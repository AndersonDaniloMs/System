const express = require("express");
const AdministradorController = require('../controllers/AdministradorController');
const administradorRouter = express.Router();

// Definindo as rotas usando o Express.js

administradorRouter.get('/', AdministradorController.BuscarTodosAdministradoresController);
administradorRouter.get('/:id', AdministradorController.AdministradorPorIdController);
administradorRouter.get('/email:email', AdministradorController.AdministradorPorEmailController);
administradorRouter.post('/', AdministradorController.InserirAdministradorController);
administradorRouter.put('/:id', AdministradorController.AtualizarAdministradorController);
administradorRouter.delete('/:id', AdministradorController.apagarAdministradorController);
administradorRouter.post('/Login', AdministradorController.ValidarLoginController);

module.exports = administradorRouter;