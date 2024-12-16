// Importar o modelo "faturas" para a associação
const { Fatura } = require('./Fatura');

module.exports = (sequelize, DataTypes) => {
  const ItemFatura = sequelize.define('itensFatura', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      validate: {
        notEmpty: true,
      },
    },
    tipo_item: {
      type: DataTypes.ENUM('produto', 'servico'),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    preco_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    fatura_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Fatura, // Referenciando o modelo Fatura diretamente
        key: 'id'
      }
    },
  }, {
    freezeTableName: true,
    timestamps: false
  });

  ItemFatura.associate = (models) => {
    // 1 para 1 relacionamento (um item de fatura pode ser um produto ou um serviço)
    ItemFatura.belongsTo(models.produtos, { foreignKey: 'item_id', constraints: false, as: 'produto' });
    ItemFatura.belongsTo(models.servicos, { foreignKey: 'item_id', constraints: false, as: 'servico' });

    // 1 para N relacionamento (um item de fatura pertence a uma fatura)
    ItemFatura.belongsTo(models.Fatura, { foreignKey: 'fatura_id' });
  };
  return ItemFatura;
}