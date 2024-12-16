const FaturaRepository = require("../repository/FaturaRepository");

class FaturaService {

  async BuscarTodasFaturasService() {
    return await FaturaRepository.getAllFaturas();
  }
  async buscarFaturaPorIdService(id) {
    return await FaturaRepository.getFaturaById(id);
  }

  async buscarFaturaPorClienteIdService(idcliente) {
    return await FaturaRepository.getFaturaByClienteId(idcliente);
  }
  async adicionarFaturaService(faturaDados) {
    return await FaturaRepository.addFatura(faturaDados);
  }
  async atualizarFaturaService(id, faturaDados) {
    return await FaturaRepository.uptadeFatura(id, faturaDados);
  }
  async apagarFaturaService(id) {
    return await FaturaRepository.deleteFatura(id);
  }
}
module.exports = new FaturaService();