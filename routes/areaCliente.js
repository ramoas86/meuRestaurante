const express = require('express');
const router = express.Router();
const Clientes = require('../models/Clientes');

router.get('/', (req, res, next) => {
  const clientes = new Clientes();
  clientes.getCliente(req, res);
});

router.get('/sair/:valor', (req, res, next) => {
  const valor = req.params.valor;

  if (valor == 'sim'){
    req.session.usuario = {
      id: '',
      nome: 'anônimo',
      email: '',
      senha: '',
      endereco: {
        rua: '',
        numero: '',
        bairro: '',
        cep: '',
      },
      totalDoCarrinho: '',
      cartoesCadastrados: [],
      carrinho: [],
    };

    res.redirect('/');
  }
});

module.exports = router;
