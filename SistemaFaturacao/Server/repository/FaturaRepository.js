db = require("../models");

class FaturaRepository {
  //Buscar Todos os clientes
  async getAllFaturas() {
    return await db.Fatura.findAll();
  }

  //Buscar o Fatura pelo Id
  async getFaturaById(id) {
    return await db.Fatura.findByPk(id);
  }

  async getFaturaByClienteId(idcliente) {
    try {
      const faturas = await db.Fatura.findAll({
        where: { cliente_id: idcliente }
      });
      if (faturas != 0) {
        return faturas;
      } else {
        console.log("Não existe nenhuma fatura com esse cliente:" + faturas);
      }

    } catch (error) {
      throw error;
    }
  }
  async addFatura(FaturaData) {
    return await db.Fatura.create(FaturaData);
  }
  //Actualizar dados do Fatura
  async uptadeFatura(id, faturaData) {
    const FaturaUpdate = await db.Fatura.findByPk(id);
    try {
      if (FaturaUpdate) {
        return db.Fatura.update(faturaData);
      }
    } catch (error) {
      throw new Error('Fatura não Encontrada');
    }
  }
  //Apagar dados do Fatura
  async deleteFatura(id) {
    const FaturaDelete = await db.Fatura.findByPk(id);
    try {
      if (FaturaDelete) {
        return FaturaDelete.destroy();
      }
    } catch (error) {
      throw new Error('Fatura não Encontrada');
    }
  }


}
module.exports = new FaturaRepository();
