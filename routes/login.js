const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('login',{
    usuario: req.session.usuario,
    carrinho: req.session.usuario.carrinho,
  });
});

module.exports = router;
