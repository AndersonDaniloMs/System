module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define(
    "produtos",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false, // Adicionando allowNull: false
        validate: {
          notEmpty: true,
        },
      },
      codigoBarra: {
        type: DataTypes.INTEGER,
        allowNull: false, // Adicionando allowNull: false
        validate: {
          notEmpty: true,
        },
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false, // Adicionando allowNull: false
        validate: {
          notEmpty: true,
        },
      },
      precoUnitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // Adicionando allowNull: false
        validate: {
          notEmpty: true,
        },
      },
      estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      estado: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },

    {
      freezeTableName: true,
      timestamps: true, // Mantendo timestamps: true
    }
  );

  Produto.associate = (models) => {
    // 1 para N relacionamento (um produto pode ter vários itens de fatura)
    Produto.hasMany(models.itensFatura, { foreignKey: "produto_id" });
    Produto.belongsTo(models.categorias, { foreignKey: 'categoria_id',as:'categoria'});
  };
  return Produto;
};
