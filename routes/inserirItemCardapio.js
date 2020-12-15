const express = require('express');
const router = express.Router();

const Cardapio = require('../models/Cardapio');

router.get('/', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  res.render('inserirItemCardapio', {
    msg: {},
    categorias: cardapioDAO.categorias,
  });
});

router.post('/', (req, res, next) => {
  //const cardapioDAO = new Cardapio();
  //cardapioDAO.insertItemCardapio(req, res);

  /*
  a fazer:
  upload de foto do item do cardápio para o servidor na página EJS.
  */

  res.send(req.body);
});

module.exports = router;
