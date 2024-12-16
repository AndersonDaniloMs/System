const express = require('express');
//Cors
const cors = require('cors');
const port = process.env.PORT || 3001; // Porta configurável via variável de ambiente
const app = express();

const db = require('./models');
const clienteRoutes = require('./Routes/RoutesCliente');
const FaturaRoutes = require("./Routes/RoutesFatura");
const pagamentoRoutes = require("./Routes/RoutesPagamento");
const produtoRoutes = require('./Routes/RoutersProduto');
const administradorRoutes = require('./Routes/RoutesAdministrador');
const categoriaRoutes = require('./Routes/RoutesCategoria');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/cliente', clienteRoutes);
app.use('/api/Fatura', FaturaRoutes);
app.use('/api/pagamentos', pagamentoRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/administrador', administradorRoutes);
app.use('/api/categorias', categoriaRoutes);



db.sequelize.sync({ force: false }).then(() => {
  console.log("Tabelas criadas com sucesso");
  app.listen(port, () => {
    console.log(`Servidor em funcionamento na porta ${port}`);
  });
}).catch(error => {
  console.error("Erro ao sincronizar tabelas:", error);
  process.exit(1); // Encerrar o processo em caso de erro de sincronização
});









/*Routes
// Select all
app.get('/select', (req, res) => {
  db.Administrador.findAll().then((Administrators) => {
    res.send(Administrators)
  }).catch((error) => console.log(error));
});

// Select all for atributte (id,name etc)
app.get('/selectForName', (req, res) => {
  db.Administrador.findAll({ where: { Nome: "Pedro" } }).then((Administrators) => {
    res.send(Administrators)
  }).catch((error) => console.log(error));
});

// Insert
app.get('/insert', async (req, res) => {
  const Administrador = await db.Administrador.create({ //Administrador nome da Model
    Nome: "Pedro",
    email: "andersonfigura200@gmail.com",
    senha: "52W34"
  }).catch(error => {
    if (error)
      console.log(error)
  });
  res.send(Administrador)
});

//Delete
app.get('/delete', async (req, res) => {
  const deleteAdministrator = db.Administrador.destroy({ where: { id: 5 } }).catch((error) => console.log(error));
  res.send(deleteAdministrator)

})*/


