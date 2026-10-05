const express = require('express');
const cors = require('cors');

console.log("Servidor iniciando...");

const app = express();

app.use(cors());
app.use(express.json());

// IMPORTAÇÕES
console.log("Carregando usuarios...");
const usuariosRoutes = require('./usuarios');

console.log("Carregando planos...");
const planosRoutes = require('./planos');

console.log("Carregando controller...");
const controller = require('./controllers.js');

// ROTAS PRINCIPAIS
app.use('/usuarios', usuariosRoutes);
app.use('/planos', planosRoutes);

// =========================
// CONSULTAS (HISTÓRICO)
// =========================

// LISTAR TODAS
app.get('/consultas', controller.listarConsultas);

// LISTAR POR USUÁRIO
app.get('/consultas/:id', controller.listarConsultasPorUsuario);

// CADASTRAR CONSULTA
app.post('/consultas', controller.cadastrarConsulta);

// TESTE
app.get('/', (req, res) => {
    res.send('API HealthMatch funcionando!');
});

// SERVIDOR
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});