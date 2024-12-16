db = require('../models');

class ClienteRepository {
  //Buscar Todos os clientes
  async getAllCliente() {
    return await db.Cliente.findAll();
  }
  //Buscar o cliente pelo Id
  async getClienteById(id) {
    return await db.Cliente.findByPk(id);
  }
  async addCliente(clienteData) {
    return await db.Cliente.create(clienteData);
  }
  //Actualizar dados do Cliente
  async updateCliente(id, clienteData) {
    try {
      const [numAffectedRows, updatedCliente] = await db.Cliente.update(
        clienteData,
        {
          where: { id: id },
        }
      );
      if (numAffectedRows > 0) {
        // Verifique se 'updatedCliente' é válido antes de retorná-lo
        if (updatedCliente) {
          return updatedCliente;
        } else {
          throw new Error("Cliente não encontrado");
        }
      } else {
        throw new Error("Cliente não encontrado");
      }
    } catch (error) {
      throw error;
    }
  }
  //Apagar dados do Cliente
  async deleteCliente(id) {
    const clienteDelete = await db.Cliente.findByPk(id);
    try {
      if (clienteDelete) {
        return clienteDelete.destroy();
      }
    } catch (error) {
      throw new Error('Cliente not found');
    }
  }


}
module.exports = new ClienteRepository();