const express = require('express');
const router = express.Router();
const Clientes = require('../models/Clientes');

router.get('/', (req, res, next) => {
  res.render('cadastro', {
    usuario: req.session.usuario,
    msg: '',
    campos: {},
  });
})

router.post('/', (req, res, next) => {
  const clientes = new Clientes();
  const retorno = clientes.checarDados(req, res);

  if (retorno.erro){
    res.render('cadastro', {
      usuario: req.session.usuario,
      msg: retorno.erro,
      campos: retorno.campos
    });
  } else {
    clientes.inserirDados(req, res);
  }
});

module.exports = router;
