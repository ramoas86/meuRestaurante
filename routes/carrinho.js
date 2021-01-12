const express = require("express");
const router = express.Router();

const Carrinho = require('../classes/Carrinho');

router.get("/", (req, res, next) => {

  const carrinhoObj = new Carrinho();

  carrinhoObj.calcularTotal(req);

  res.render("carrinho", {
    usuario: req.session.usuario,
    total: req.session.usuario.totalDoCarrinho,
    itemRemovido: '',
  });
});

module.exports = router;
