const ProdutoService = require("../services/ProdutoService");

class ProdutoController {
  async BuscarTodosProdutosController(req, res) {
    try {
      const Tprodutos = await ProdutoService.BuscarTodosProdutosService();
      res.json(Tprodutos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async ProdutoPorIdController(req, res) {
    try {
      const produto = await ProdutoService.BuscarProdutoPorIdService(req.params.id);
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async InserirProdutoController(req, res) {
    try {
      const produto = await ProdutoService.InserirProdutoService(req.body);
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async AtualizarProdutoController(req, res) {
    try {
      const produto = await ProdutoService.AtualizarProdutoService(req.params.id, req.body);
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  async AtualizarEstoqueProdutoController(req, res) {
    const { id } = req.params;
    const novoEstoque = req.body.estoque;
    try {
      const produtoAtualizado = await ProdutoService.updateEstoqueProdutoService(id, novoEstoque);
      res.status(200).json(produtoAtualizado);
    } catch (error) {
      console.error(`Erro ao atualizar o estoque do produto: ${error.message}`);
      res.status(500).json({ error: 'Erro interno ao atualizar o estoque do produto.' });
    }
  }


  async apagarProdutoController(req, res) {
    try {
      const produto = await ProdutoService.ApagarProdutoService(req.params.id);
      res.json(produto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ProdutoController();