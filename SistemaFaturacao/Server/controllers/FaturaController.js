const FaturaService = require("../services/FaturaService");

class FaturaController {
  async BuscarTodasFaturasController(req, res) {
    try {
      const faturas = await FaturaService.BuscarTodasFaturasService();
      res.json(faturas); // Removendo o res.send() redundante
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async FaturaPorIdController(req, res) {
    try {
      const fatura = await FaturaService.buscarFaturaPorIdService(req.params.id);
      res.json(fatura);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async FaturaPorClienteIdController(req, res) {
    try {
      const fatura = await FaturaService.buscarFaturaPorClienteIdService(req.params.idcliente);
      res.json(fatura);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async AdicionarFaturaController(req, res) {
    try {
      const faturaAdd = await FaturaService.adicionarFaturaService(req.body);
      res.status(201).json(faturaAdd);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async ActualizarFaturaController(req, res) {
    try {
      const FaturaUpdate = await FaturaService.atualizarFaturaService(req.params.id, req.body);
      res.json(FaturaUpdate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async ApagarFaturaController(req, res) {
    try {
      const FaturaDelete = await FaturaService.apagarFaturaService(req.params.id);
      res.status(204).send(FaturaDelete); // Mantendo o res.send() para o DELETE (204 No Content)
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new FaturaController();