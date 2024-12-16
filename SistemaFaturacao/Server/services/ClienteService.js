const ClienteRepository = require("../repository/ClienteRepository");

class ClienteService {
  async BuscarTodosClientesService() {
    return await ClienteRepository.getAllCliente();
  }
  async BuscarClientePorIdService(id) {
    return await ClienteRepository.getClienteById(id);
  }
  async InserirClienteService(cliente) {
    return await ClienteRepository.addCliente(cliente);
  }
  async AtualizarClienteService(id, cliente) {
    return await ClienteRepository.updateCliente(id, cliente);
  }
  async ApagarClienteService(id) {
    return await ClienteRepository.deleteCliente(id);
  }
}
module.exports = new ClienteService();