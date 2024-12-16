

module.exports = (sequelize, DataTypes) => {
  const Servico = sequelize.define("servicos", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    preco_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false, // Adicionando allowNull: false
      validate: {
        notEmpty: true,
      },
    },
  },
    {
      freezeTableName: true,
      timestamps: false
    });

  // Adicionando associação com ItensFatura
  Servico.associate = (models) => {
    Servico.hasMany(models.itensFatura, { foreignKey: 'servico_id', as: 'itens_fatura' });
  };

  return Servico;
}