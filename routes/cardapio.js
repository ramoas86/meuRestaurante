const express = require('express');
const router = express.Router();

const Cardapio = require('../models/Cardapio');

router.get('/', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  cardapioDAO.getCardapio(res);
});

module.exports = router;
