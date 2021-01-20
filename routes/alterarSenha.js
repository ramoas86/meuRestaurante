const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('alterarSenha', {
    usuario: req.session.usuario,
    msg: {}
  });
});

module.exports = router;
