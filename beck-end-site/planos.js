const express = require('express');
const router = express.Router();
const planosController = require('./planosControllers');

router.get('/', planosController.listarPlanos);
router.post('/', planosController.cadastrarPlano);

module.exports = router;