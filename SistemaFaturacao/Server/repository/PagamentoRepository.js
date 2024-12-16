db = require("../models");

class PagamentoRepository {
  async getAllPagamento() {
    return await db.pagamentos.findAll();
  }
  //Buscar o pagamento pelo Id
  async getPagamentoById(id) {
    return await db.pagamentos.findByPk(id);
  }

  async getPagamentoByFaturaId(idFatura) {
    try {
      const pagamento = await db.pagamentos.findAll({
        where: { fatura_id: idFatura }
      });
      if (pagamento != 0) {
        return pagamento;
      } else {
        console.log("Não existe nenhum pagamento com essa fatura:" + pagamento);
      }

    } catch (error) {
      throw error;
    }
  }
  async addPagamento(pagamentoData) {
    return await db.pagamentos.create(pagamentoData);
  }
  //Actualizar dados do Pagamento
  async uptadePagamento(id, pagamentoData) {
    const pagamentoUpdate = await db.pagamentos.findByPk(id);
    try {
      if (pagamentoUpdate > 0) {
        return pagamentoData.update(pagamentoData);
      }
    } catch (error) {
      throw new Error('Pagamento not found');
    }
  }
  //Apagar Pagamento
  async deletePagamento(id) {
    return await db.pagamentos.destroy({
      where: { id }
    });
  }
}

module.exports = new PagamentoRepository();