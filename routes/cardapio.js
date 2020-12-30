const express = require('express');
const router = express.Router();

const Cardapio = require('../models/Cardapio');

router.get('/', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  res.render('cardapio', {
    params: req.params,
    categoriasDAO: cardapioDAO.categorias,
    itemAdicionadoAoCarrinho: '',
  });
});

router.get('/:categoria', (req, res, next) => {
  const cardapioDAO = new Cardapio();

  if (!req.query.id){
    cardapioDAO.getCardapio(req, res);
  } else {
    cardapioDAO.adicionarItemAoCarrinho(req, res);
  }
});

router.get('/:categoria/:id_prato', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  cardapioDAO.getItemCardapio(req, res);
});

module.exports = router;
