const { DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");

// Importar o modelo "faturas" para a associação
const { Fatura } = require('./Fatura'); // Importando o modelo Fatura

module.exports = (sequelize, DataTypes) => {
  const Pagamento = sequelize.define("pagamentos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    dataPagamento: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    valorPago: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    metodoPagamento: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    troco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    divida: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    fatura_id: { // Adicionando a chave estrangeira
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Fatura, // Referenciando o modelo Fatura
        key: 'id'
      }
    }
  },
    {
      freezeTableName: true,
      timestamps: false
    });

  Pagamento.associate = (models) => {
    // 1 para N relacionamento (um pagamento pertence a uma fatura)
    Pagamento.belongsTo(models.Fatura, { foreignKey: 'fatura_id' });
  };
  return Pagamento;
}