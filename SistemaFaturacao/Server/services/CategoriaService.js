const CategoriaRepository = require('../repository/CategoriaRepository');
class CategoriaService {
  async BuscarTodasCategoriasService() {
    return await CategoriaRepository.getAllCategoria();
  }
  async BuscarCategoriaPorIdService(id) {
    return await CategoriaRepository.getCategoriaById(id);
  }
  async AdicionarCategoriaService(categoria) {
    return await CategoriaRepository.addCategoria(categoria);
  }
  async AtualizarCategoriaService(id, categoria) {
    return await CategoriaRepository.updateCategoria(id, categoria);
  }
  async ApagarCategoriaService(id) {
    return await CategoriaRepository.deleteCategoria(id);
  }
  async BuscarCategoriaPorNomeService(nome){
    return await CategoriaRepository.getCategoriaByNome(nome);
  }
}
module.exports = new CategoriaService();

