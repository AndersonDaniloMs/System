const CategoriaService = require('../services/CategoriaService');

class CategoriaController {
  async BuscarTodasCategoriasController(req, res) {
    try {
      const Tcategorias = await CategoriaService.BuscarTodasCategoriasService();
      res.json(Tcategorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async CategoriaPorIdController(req, res) {
    try {
      const categoria = await CategoriaService.BuscarCategoriaPorIdService(req.params.id);
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async CriarCategoriaController(req, res) {
    try {
      const categoria = await CategoriaService.AdicionarCategoriaService(req.body);
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async AtualizarCategoriaController(req, res) {
    try {
      const categoria = await CategoriaService.AtualizarCategoriaService(req.params.id, req.body);
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async ApagarCategoriaController(req, res) {
    try {
      const categoria = await CategoriaService.ApagarCategoriaService(req.params.id);
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async BuscarCategoriaPorNomeController(req, res) {
    try {
      const categoria = await CategoriaService.BuscarCategoriaPorNomeService(req.params.nome);
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CategoriaController();