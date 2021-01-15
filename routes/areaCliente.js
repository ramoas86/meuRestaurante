const express = require('express');
const router = express.Router();
const Clientes = require('../models/Clientes');

router.get('/', (req, res, next) => {
  const clientes = new Clientes();
  clientes.getCliente(req, res);
});

router.post('/', (req, res, next) => {
  const clientes = new Clientes();
  clientes.logar(req, res);
});

module.exports = router;
