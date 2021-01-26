const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render("caixa", {
    usuario: req.session.usuario,
  });
});

router.post('/', (req, res, next) => {
  res.send('compra efetuada com sucesso.');
});

module.exports = router;
