db = require('../models');

class CategoriaRepository {
  //Buscar Todas as categorias
  async getAllCategoria() {
    return await db.categorias.findAll();
  }
  //Buscar a categoria pelo Id
  async getCategoriaById(id) {
    return await db.categorias.findByPk(id);
  }
  async addCategoria(categoriaData) {
    return await db.categorias.create(categoriaData);
  }
  //Apagar dados da categoria
  async deleteCategoria(id) {
    const categoriaDelete = await db.categorias.findByPk(id);
    try {
      if (categoriaDelete) {
        return categoriaDelete.destroy();
      }
    } catch (error) {
      throw new Error('Categoria não Encontrada');
    }
  }
  //Actualizar dados da categoria
  async updateCategoria(id, categoriaData) {
    const categoriaUpdate = await db.categorias.findByPk(id);
    try {
      if (categoriaUpdate) {
        return db.categorias.update(categoriaData);
      }
    } catch (error) {
      throw new Error('Categoria não Encontrada');
    }
  }
  //Buscar Categoria por nome
  async getCategoriaByNome(nome) {
    return await db.categorias.findAll({
      where: {
        nome: nome
      }
    });
  }
}

module.exports = new CategoriaRepository();