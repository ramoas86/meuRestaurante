const express = require('express');
const router = express.Router();

const Cardapio = require('../models/Cardapio');

router.get('/', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  res.render('cardapio', {
    params: req.params,
    categoriasDAO: cardapioDAO.categorias
  });
});

router.get('/:categoria', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  cardapioDAO.getCardapio(req, res);
});

module.exports = router;
