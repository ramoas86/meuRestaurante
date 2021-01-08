function removerItemDoCarrinho(item_id){
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){

      const res = JSON.parse(this.responseText);

      //remover item
      const element = document.getElementById(item_id);
      document.getElementById('itens_carrinho').removeChild(element);
      //ativar alerta de remoção
      document.getElementById('alert_item_adicionado').hidden = false;
      document.getElementById('alert_item_adicionado').innerHTML = res.nomeItemRemovido + ' removido do carrinho.'
      //atualizar total
      document.getElementById('total').innerHTML = res.total;
      //atualizar carrinho
      document.getElementById('quantidadeCarrinho').innerHTML = res.totalDeItensNoCarrinho;

      if (res.totalDeItensNoCarrinho == 0){
        //atualizar carrinho
        document.getElementById('imagemCarrinho').src = "/images/icons/cart.svg";
        document.getElementById('quantidadeCarrinho').innerHTML = "0";
        //remover total e botão de or ao caixa
        const total = document.getElementById('total_div');
        const caixa = document.getElementById('btn_caixa');
        document.getElementById('itens_carrinho').removeChild(total);
        document.getElementById('itens_carrinho').removeChild(caixa);
      }
    }
  };

  const url = '/remover_item_carrinho?item_id=' + item_id;

  xhttp.open("GET", url, true);
  xhttp.send();
}
