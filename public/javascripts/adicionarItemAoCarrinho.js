function adiconarItemAoCarrinho(item_id){
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){

      const res = JSON.parse(this.responseText);

      document.getElementById('imagemCarrinho').src = "/images/icons/cart-fill.svg";
      document.getElementById('quantidadeCarrinho').innerHTML = res.carrinho.length;
      document.getElementById('alert_item_adicionado').hidden = false;
      document.getElementById('alert_item_adicionado').innerHTML = `${res.nomeDoItemAdicionado} adicionado ao carrinho.`;
    }
  };

  const url = '/adicionar_item_carrinho?item_id=' + item_id;

  xhttp.open("GET", url, true);
  xhttp.send();
}
