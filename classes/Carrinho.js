class Carrinho {
  constructor() {

  }

  removerItem(req){
    const carrinho = req.session.usuario.carrinho;
    const id_item = req.query.item_id;

    for (let i = 0; i < carrinho.length; i++){
      if (carrinho[i]._id == id_item){
        carrinho.splice(i, 1);
        break;
      }
    }
  }

  getNomeItemASerRemovido(req){
    const carrinho = req.session.usuario.carrinho;
    const id_item = req.query.item_id;
    let itemNome = '';

    for (let i = 0; i < carrinho.length; i++){
      if (carrinho[i]._id == id_item){
        this.itemASerRemovido = carrinho[i].nome;
        break;
      }
    }

    return itemNome;
  }

  calcularTotal(req){
    let carrinho = req.session.usuario.carrinho;
    let total = 0;

    for (let item of carrinho) {
      let valorText = item.valor + "." + item.valorCentavos1 + item.valorCentavos2;
      let valor = parseFloat(valorText);
      total += valor;
    }

    req.session.usuario.totalDoCarrinho = new Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(total);
  }
}

module.exports = Carrinho;
