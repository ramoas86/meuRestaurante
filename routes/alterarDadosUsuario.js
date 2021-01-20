const express = require('express');
const router = express.Router();

const Clientes = require('../models/Clientes');

router.get('/', (req, res, next) => {
  res.render('alterarDadosUsuario',{
    usuario: req.session.usuario,
    msg: {}
  });
});

router.post('/', (req, res, next) => {
  const clientes = new Clientes();
  clientes.atualizarDados(req, res);
});

module.exports = router;
