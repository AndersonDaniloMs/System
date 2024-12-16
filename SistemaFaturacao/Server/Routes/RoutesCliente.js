const express = require("express");
const clienteController = require("../controllers/ClienteController");
const routerCliente = express.Router();

// Definindo as rotas usando o Express.js
routerCliente.get('/', clienteController.BuscarTodosClientesController);
routerCliente.get('/:id', clienteController.ClientePorIdController);
routerCliente.post('/', clienteController.AdicionarClienteController);
routerCliente.put('/:id', clienteController.ActualizarClienteController);
routerCliente.delete('/:id', clienteController.ApagarClienteController);

module.exports = routerCliente; 