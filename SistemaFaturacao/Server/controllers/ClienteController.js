const ClienteService = require("../services/ClienteService");

class ClienteController {
  async BuscarTodosClientesController(req, res) {
    try {
      const Tclientes = await ClienteService.BuscarTodosClientesService();
      res.json(Tclientes); // Removendo o res.send() redundante
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async ClientePorIdController(req, res) {
    try {
      const cliente = await ClienteService.BuscarClientePorIdService(req.params.id);
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async AdicionarClienteController(req, res) {
    try {
      const clienteAdd = await ClienteService.InserirClienteService(req.body);
      res.status(201).json(clienteAdd);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async ActualizarClienteController(req, res) {
    try {
      const clienteUpdate = await ClienteService.AtualizarClienteService(req.params.id, req.body);
      res.json(clienteUpdate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async ApagarClienteController(req, res) {
    try {
      const clienteDelete = await ClienteService.ApagarClienteService(req.params.id);
      res.status(204).send(clienteDelete); // Mantendo o res.send() para o DELETE (204 No Content)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ClienteController(); 