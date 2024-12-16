const PagamentoServices = require("../services/PagamentoService");

class PagamentoController {

  async BuscarTodosPagamentosController(req, res) {
    try {
      const Tpagamentos = await PagamentoServices.BuscarTodosPagamentosService();
      res.json(Tpagamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async BuscarPagamentoPorIdController(req, res) {
    try {
      const pagamento = await PagamentoServices.BuscarPagamentoPorIdService(req.params.id);
      res.json(pagamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  async BuscarPagamentoPorFaturaIdController(req, res) {
    try {
      const pagamento = await PagamentoServices.BuscarPagamentoByFaturaIdService(req.params.idFatura);
      res.json(pagamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  async InserirPagamentoController(req, res) {
    try {
      const pagamento = await PagamentoServices.inserirPagamentoService(req.body);
      res.json(pagamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async AtualizarPagamentoController(req, res) {
    try {
      const pagamento = await PagamentoServices.AtualizarPagamentoService(req.params.id, req.body);
      res.json(pagamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async ApagarPagamentoController(req, res) {
    try {
      const pagamento = await PagamentoServices.ApagarPagamentoService(req.params.id);
      res.json(pagamento);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

module.exports = new PagamentoController();