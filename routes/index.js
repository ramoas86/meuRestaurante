const express = require('express');
const router = express.Router();

const Noticias = require('../models/Noticias');

/* GET home page. */
router.get('/', function(req, res, next) {
  const noticiasDAO = new Noticias();
  noticiasDAO.getNoticias(req, res);
});

module.exports = router;
