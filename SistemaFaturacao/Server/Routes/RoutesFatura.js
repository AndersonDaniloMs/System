const express = require("express");
const faturaController = require("../controllers/FaturaController");
const routerFatura = express.Router();

// Definindo as rotas usando o Express.js
routerFatura.get('/', faturaController.BuscarTodasFaturasController);
routerFatura.get('/cliente/:idcliente', faturaController.FaturaPorClienteIdController);
routerFatura.get('/:id', faturaController.FaturaPorIdController);
routerFatura.post('/', faturaController.AdicionarFaturaController);
routerFatura.put('/:id', faturaController.ActualizarFaturaController);
routerFatura.delete('/:id', faturaController.ApagarFaturaController);

module.exports = routerFatura; 