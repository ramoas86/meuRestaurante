const express = require('express');
const router = express.Router();

const Cardapio = require('../models/Cardapio');

router.get('/', function(req, res, next) {
  const cardapioDAO = new Cardapio();
  cardapioDAO.adicionarItemAoCarrinho(req, res);
});

module.exports = router;
