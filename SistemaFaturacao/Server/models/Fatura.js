
module.exports = (sequelize, DataTypes) => {
  const Fatura = sequelize.define("Fatura", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false, // alllowNull -> allowNull
      autoIncrement: true,
      validate: {
        notEmpty: true,
      }
    },
    numeroFatura: {
      type: DataTypes.STRING(50),
      allowNull: false, // alllowNull -> allowNull
      validate: {
        notEmpty: true,
      }
    },
    dataEmissao: {
      type: DataTypes.DATE,
      allowNull: false, // alllowNull -> allowNull
      validate: {
        notEmpty: true,
      }
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, // alllowNull -> allowNull
      validate: {
        notEmpty: true,
      }
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, // alllowNull -> allowNull
      validate: {
        notEmpty: true,
      }
    },
    iva: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, // alllowNull -> allowNull
      validate: {
        notEmpty: true,
      }
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Cliente', // Corrigindo o nome do modelo para 'Cliente'
        key: 'id'
      }
    }
  },
    {
      freezeTableName: true,
      timestamps: false,
    });

  Fatura.associate = (models) => {
    // 1 para 1 relacionamento (uma fatura pertence a um cliente)
    Fatura.belongsTo(models.Cliente, { foreignKey: 'cliente_id' }); // Corrigindo o nome do modelo para 'Cliente'

    // 1 para N relacionamento (uma fatura pode ter vários itens de fatura)
    Fatura.hasMany(models.itensFatura, { foreignKey: 'fatura_id' });

    // 1 para N relacionamento (uma fatura pode ter vários pagamentos)
    Fatura.hasMany(models.pagamentos, { foreignKey: 'fatura_id' });
  };
  return Fatura;
}