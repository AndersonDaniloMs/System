const ProdutoRepository = require("../repository/ProdutoRepository");

class ProdutoService {

  async BuscarTodosProdutosService() {
    return await ProdutoRepository.getAllProduto();
  }
  async BuscarProdutoPorIdService(id) {
    return await ProdutoRepository.getProdutoById(id);
  }
  async InserirProdutoService(produtoData) {
    return await ProdutoRepository.addProduto(produtoData);
  }
  async AtualizarProdutoService(id, produtoData) {
    try {
      console.log(`Atualizando produto com ID ${id}...`);
      console.log(`Produto atualizado com sucesso:`, produtoData);

      return await ProdutoRepository.updateProduto(id, produtoData);

    } catch (error) {
      throw new Error(`Erro ao atualizar o produto no serviço: ${error.message}`);
    }
  }

  //Update estoqueProdutoService
  async updateEstoqueProdutoService(id, novoEstoque) {
    try {
      return await ProdutoRepository.updateEstoqueProduto(id, novoEstoque);
    } catch (error) {
      throw new Error(`Erro ao atualizar o estoque  produto no serviço: ${error.message}`);
    }
  }
  async ApagarProdutoService(id) {
    return await ProdutoRepository.deleteProduto(id);
  }
  /*async ApagarTodosProdutosService() {
    return await this.ProdutoRepository.deleteAllProduto();
  }*/
}

module.exports = new ProdutoService();