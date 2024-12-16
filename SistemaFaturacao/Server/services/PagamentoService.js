const PagamentoRepository = require("../repository/PagamentoRepository");

class PagamentoService {

  async BuscarTodosPagamentosService() {
    return await PagamentoRepository.getAllPagamento();
  }
  async BuscarPagamentoByIdService(id) {
    return await PagamentoRepository.getPagamentoById(id);
  }
  async BuscarPagamentoByFaturaIdService(idFatura) {
    return await PagamentoRepository.getPagamentoByFaturaId(idFatura);
  }
  async inserirPagamentoService(data) {
    return await PagamentoRepository.addPagamento(data);
  }
  async atualizarPagamentoService(id, data) {
    return await PagamentoRepository.uptadePagamento(id, data);
  }
  async ApagarPagamentoService(id) {
    return await PagamentoRepository.deletePagamento(id);
  }

}

module.exports = new PagamentoService();

