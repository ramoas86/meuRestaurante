const express = require('express');
const router = express.Router();

const Noticias = require('../models/Noticias');

router.get('/', (req, res, next) => {
  res.render('inserirNoticia', {msg: {}});
});

router.post('/', (req, res, next) => {
  const noticiasDAO = new Noticias();
  const body = req.body;
  noticiasDAO.insertNoticias(req, res);
});

module.exports = router;
