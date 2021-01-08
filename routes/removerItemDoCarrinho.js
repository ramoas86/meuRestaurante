let express = require('express');
let router = express.Router();

const Carrinho = require('../classes/Carrinho');

router.get('/', (req, res, next) => {

  const carrinhoObj = new Carrinho();

  const nomeItemRemovido = carrinhoObj.getNomeItemASerRemovido(req);
  carrinhoObj.removerItem(req);
  carrinhoObj.calcularTotal(req);
  const totalDeItensNoCarrinho = carrinhoObj.calcularTotalDeItensNoCarrinho(req);

  res.send({
    nomeItemRemovido: nomeItemRemovido,
    total: req.session.usuario.totalDoCarrinho,
    totalDeItensNoCarrinho: totalDeItensNoCarrinho,
  });

});

module.exports = router;
