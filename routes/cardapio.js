const express = require('express');
const router = express.Router();

const Cardapio = require('../models/Cardapio');

router.get('/', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  res.render('cardapio', {categorias: cardapioDAO.categorias});
});

module.exports = router;
