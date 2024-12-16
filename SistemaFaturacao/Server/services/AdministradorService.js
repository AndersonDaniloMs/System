const AdministradorRepository = require('../repository/AdministradorRepository');

class AdministradorService {
  async BuscarTodosAdministradoresService() {
    return await AdministradorRepository.getAllAdministrador();
  }
  async BuscarAdministradorPorIdService(id) {
    return await AdministradorRepository.getAdministradorById(id);
  }
  async InserirAdministradorService(administrador) {
    return await AdministradorRepository.addAdministrador(administrador);
  }
  async AtualizarAdministradorService(id, administrador) {
    return await AdministradorRepository.updateAdministrador(id, administrador);
  }
  async ApagarAdministradorService(id) {
    return await AdministradorRepository.deleteAdministrador(id);
  }
  async BuscarAdministradorPorEmailService(email) {
    return await AdministradorRepository.getAdministradorByEmail(email);
  }
  async AuthenticarAdministradorService(username, senha) {
    return AdministradorRepository.AuthenticarLoginAdministrador(username, senha);
  }
}

module.exports = new AdministradorService();