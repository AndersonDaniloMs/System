const express = require('express');
const PagamentoController = require("../controllers/PagamentoController");
const pagamentoRouter = express.Router()


pagamentoRouter.get('/', PagamentoController.BuscarTodosPagamentosController);
pagamentoRouter.get('/:id', PagamentoController.BuscarPagamentoPorIdController);
pagamentoRouter.get('/fatura/:id', PagamentoController.BuscarPagamentoPorFaturaIdController);
pagamentoRouter.post('/', PagamentoController.InserirPagamentoController);
pagamentoRouter.put('/:id', PagamentoController.AtualizarPagamentoController);
pagamentoRouter.delete('/:id', PagamentoController.ApagarPagamentoController);


module.exports = pagamentoRouter;
