const express = require('express');
const CategoriaController = require('../controllers/CategoriaController');
const categoriaRouter = express.Router();

categoriaRouter.get('/', CategoriaController.BuscarTodasCategoriasController);
categoriaRouter.get('/:id', CategoriaController.CategoriaPorIdController);
categoriaRouter.get('/nome:nome', CategoriaController.BuscarCategoriaPorNomeController);
categoriaRouter.post('/', CategoriaController.CriarCategoriaController);
categoriaRouter.put('/:id', CategoriaController.AtualizarCategoriaController);
categoriaRouter.delete('/:id', CategoriaController.ApagarCategoriaController);

module.exports = categoriaRouter;