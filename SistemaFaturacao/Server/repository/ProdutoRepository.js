db = require('../models');

class ProdutoRepository {
  //Buscar Todos os produtos
  async getAllProduto() {
    return await db.produtos.findAll();
  }
  //Buscar o produto pelo Id
  async getProdutoById(id) {
    return await db.produtos.findByPk(id);
  }
  //Apagar dados do produto
  async deleteProduto(id) {
    const produtoDelete = await db.produtos.findByPk(id);
    try {
      if (produtoDelete) {
        return await produtoDelete.destroy();
      }
      else {
        throw new Error("Produto não eliminado e não encotrado");
      }
    } catch (error) {
      throw new Error("Produto não Encontrado");
    }


  }
  //Inserir dados do produto
  async addProduto(produtoData) {
    return await db.produtos.create(produtoData);
  }
  //Actualizar dados do produto
  async updateProduto(id, produtoData) {
    const produtoUpdate = await db.produtos.findByPk(id);
    try {
      if (produtoUpdate) {
        return await produtoData.update(produtoData);
      }
      else {
        throw new Error("Produto não Actualizado e não encontrado");
      }
    } catch (error) {
      throw new Error("Produto não Encontrado");
    }
  }
  //Update estoqueProduto
  async updateEstoqueProduto(id, novoEstoque) {
    try {
      const produtoUpdate = await db.produtos.findByPk(id);

      if (produtoUpdate) {
        // Atualiza apenas o campo de estoque
        await produtoUpdate.update({ estoque: novoEstoque });
        return produtoUpdate;
      } else {
        throw new Error("Produto não encontrado");
      }
    } catch (error) {
      throw new Error(`Erro ao atualizar o estoque do produto: ${error.message}`);
    }
  }

}

module.exports = new ProdutoRepository();