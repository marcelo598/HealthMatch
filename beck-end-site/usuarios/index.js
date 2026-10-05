const express = require('express');
const router = express.Router();

// importa o controller
const controller = require('../controllers');


// =========================
// 👤 ROTAS DE USUÁRIOS
// =========================

// LISTAR TODOS
router.get('/', controller.listarUsuarios);

// CADASTRAR
router.post('/', controller.cadastrarUsuario);


module.exports = router;