const express = require("express");
const ProdutoController = require("../controllers/ProdutoController");
const produtoRouter = express.Router();


produtoRouter.get("/", ProdutoController.BuscarTodosProdutosController);
produtoRouter.get("/:id", ProdutoController.ProdutoPorIdController);
produtoRouter.post("/", ProdutoController.InserirProdutoController);
produtoRouter.put("/:id", ProdutoController.AtualizarProdutoController);
produtoRouter.delete("/:id", ProdutoController.apagarProdutoController);
// Rota para atualizar apenas o estoque de um produto pelo ID
produtoRouter.patch("/:id/estoque", ProdutoController.AtualizarEstoqueProdutoController);

module.exports = produtoRouter;