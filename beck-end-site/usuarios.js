const express = require('express');

const router = express.Router();

const usuariosController = require('./controllers');

router.get('/', usuariosController.listarUsuarios);

router.post('/', usuariosController.cadastrarUsuario);

router.post('/recuperar-senha', usuariosController.recuperarSenha);

module.exports = router;