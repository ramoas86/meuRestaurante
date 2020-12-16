const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './uploads/fotosCardapio' })

const Cardapio = require('../models/Cardapio');

router.get('/', (req, res, next) => {
  const cardapioDAO = new Cardapio();
  res.render('inserirItemCardapio', {
    msg: {},
    categorias: cardapioDAO.categorias,
  });
});

router.post('/', upload.single('foto'), (req, res, next) => {
  const cardapioDAO = new Cardapio();
  cardapioDAO.insertItemCardapio(req, res);
});

module.exports = router;
