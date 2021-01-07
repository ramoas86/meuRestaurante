let express = require('express');
let router = express.Router();

const Carrinho = require('../classes/Carrinho');

router.get('/', (req, res, next) => {

  const carrinhoObj = new Carrinho();

  const itemNome = carrinhoObj.getNomeItemASerRemovido(req);
  carrinhoObj.removerItem(req);
  carrinhoObj.calcularTotal(req);

  res.render("carrinho", {
    carrinho: req.session.usuario.carrinho,
    total: req.session.usuario.totalDoCarrinho,
    itemRemovido: itemNome,
  });

});

module.exports = router;
