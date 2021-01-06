let express = require("express");
let router = express.Router();

router.get("/", (req, res, next) => {

  let carrinho = req.session.usuario.carrinho;
  let total = 0;

  for (let item of carrinho) {
    let valorText = item.valor + "." + item.valorCentavos1 + item.valorCentavos2;
    let valor = parseFloat(valorText);
    total += valor;
  }

  let convertedTotal = new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(total);

  res.render("carrinho", {
    carrinho: carrinho,
    total: convertedTotal,
  });
});

module.exports = router;
