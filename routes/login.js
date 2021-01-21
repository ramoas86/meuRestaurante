const express = require('express');
const router = express.Router();
const Clientes = require('../models/Clientes');

router.get('/', (req, res, next) => {
  res.render('login',{
    usuario: req.session.usuario,
    carrinho: req.session.usuario.carrinho,
    msg: {},
  });
});

router.post('/', (req, res, next) => {
  const clientes = new Clientes();
  clientes.logar(req, res);
});

module.exports = router;
