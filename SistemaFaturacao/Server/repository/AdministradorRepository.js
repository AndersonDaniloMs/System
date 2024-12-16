db = require("../models");

class AdministradorRepository {

  async getAllAdministrador() {
    return await db.Administrador.findAll();
  }

  async getAdministradorById(id) {
    return await db.Administrador.findByPk(id);
  }
  async getAdministradorByEmail(email) {
    return await db.Administrador.findOne({
      where: { email: email }
    });
  }
  async addAdministrador(administradorData) {
    return await db.Administrador.create(administradorData);
  }
  async updateAdministrador(id, administradorData) {
    const administradorUpdate = await db.Administrador.findByPk(id);
    try {
      if (administradorUpdate) {
        return db.Administrador.update(administradorData);
      }
    } catch (error) {
      throw error;
    }
  }
  async deleteAdministrador(id) {
    const administradorDelete = await db.Administrador.findByPk(id);
    try {
      if (administradorDelete) {
        return administradorDelete.destroy();
      }
    } catch (error) {
      throw new Error("Administrador não Encontrado");
    }
  }

  async AuthenticarLoginAdministrador(username, senha) {
    try {
      const administradorAuthenticar = await db.Administrador.findOne({ where: { username, senha } });
      if (administradorAuthenticar)
        return administradorAuthenticar;
      else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      throw new Error('Administrador não Encontrado');
    }
  }
}

module.exports = new AdministradorRepository();