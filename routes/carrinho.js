const express = require("express");
const router = express.Router();

const Carrinho = require('../classes/Carrinho');

router.get("/", (req, res, next) => {

  const carrinhoObj = new Carrinho();

  carrinhoObj.calcularTotal(req);

  res.render("carrinho", {
    carrinho: req.session.usuario.carrinho,
    total: req.session.usuario.totalDoCarrinho,
    itemRemovido: '',
  });
});

module.exports = router;
