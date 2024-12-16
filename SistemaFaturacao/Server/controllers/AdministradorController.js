const AdministradorService = require('../services/AdministradorService');

class AdministradorController {
  async BuscarTodosAdministradoresController(req, res) {
    try {
      const Tadministradores = await AdministradorService.BuscarTodosAdministradoresService();
      res.json(Tadministradores); // Removendo o res.send() redundante
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async AdministradorPorIdController(req, res) {
    try {
      const administrador = await AdministradorService.BuscarAdministradorPorIdService(req.params.id);
      res.json(administrador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async InserirAdministradorController(req, res) {
    try {
      const administrador = await AdministradorService.InserirAdministradorService(req.body);
      res.json(administrador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async AtualizarAdministradorController(req, res) {
    try {
      const administrador = await AdministradorService.AtualizarAdministradorService(req.params.id, req.body);
      res.json(administrador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async apagarAdministradorController(req, res) {
    try {
      const administrador = await AdministradorService.ApagarAdministradorService(req.params.id);
      res.json(administrador);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async AdministradorPorEmailController(req, res) {
    try {
      const administradorEmail = await AdministradorService.BuscarAdministradorPorIdService(req.params.email);
      res.json(administradorEmail);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async ValidarLoginController(req, res) {
    try {
      const { username, senha } = req.body;
      const administrador = await AdministradorService.AuthenticarAdministradorService(username, senha);
      res.json(administrador);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AdministradorController();