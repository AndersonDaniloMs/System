module.exports = (Sequelize, DataTypes) => {
  const Categoria = Sequelize.define("categorias", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    nomeCategoria: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }
  );
  Categoria.associate = (models) => {
    Categoria.hasMany(models.produtos, { foreignKey: "categoria_id", as: "produtos" });
  };



  return Categoria;
}
