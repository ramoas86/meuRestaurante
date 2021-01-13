const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (req.session.usuario.id == ''){
    res.render('login',{
      usuario: req.session.usuario,
      carrinho: req.session.usuario.carrinho,
    });
  } else {
    res.send('usuário já logado');
  }
});

module.exports = router;
