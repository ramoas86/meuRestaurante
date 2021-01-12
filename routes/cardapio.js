const express = require('express');
const router = express.Router();

const Cardapio = require('../models/Cardapio');

router.get('/', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  res.render('cardapio', {
    params: req.params,
    categoriasDAO: cardapioDAO.categorias,
    usuario: req.session.usuario,
    itemAdicionadoAoCarrinho: '',
  });
});

router.get('/:categoria', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  cardapioDAO.getCardapio(req, res);
});

router.get('/:categoria/:id_prato', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  cardapioDAO.getItemCardapio(req, res);
});

module.exports = router;
