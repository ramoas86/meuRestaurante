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

module.exports = router;
