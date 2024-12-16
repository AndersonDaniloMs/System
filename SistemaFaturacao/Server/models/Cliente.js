module.exports = (sequelize, DataTypes) => {
  const Cliente = sequelize.define(
    "Cliente",
    {
      // Nome da tabela alterado
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        validate: {
          notEmpty: true,
        },
      },
      bi: {
        type: DataTypes.STRING,
        allowNull: false,
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
      telefone: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      endereco: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  // Associações ou relacionamento
  Cliente.associate = (models) => {
    // 1 para N relacionamento (um cliente pode ter muitas faturas)
    Cliente.hasMany(models.Fatura, { foreignKey: "cliente_id" });
  };

  return Cliente;
};
