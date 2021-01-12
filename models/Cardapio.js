const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'meuRestaurante';

const ObjectId = require('mongodb').ObjectId;

class Cardapio {
  constructor() {
    this.categorias = [
      'Pratos',
      'Pizzas',
      'Massas',
      'Bebidas',
      'Salgados',
      'Doces',
    ];
  }

  gerarArrayCardapioCategoria(result){
    /*
    tratar a URL das fotos para remover 'uploads/'.
    */
    for (let item of result){
      let newFotoUrl = item.fotoUrl.slice(7, item.fotoUrl.length);
      item.fotoUrl = newFotoUrl;
    }

    /*
    criar matrix para renderização na view.
    */
    const cardapioCatArray = [];
    let arrayLinha = [];
    let indexColeta = 2;

    for (let i = 0; i < result.length; i++) {
      if (i <= indexColeta){
        arrayLinha.push(result[i]);
        if (i == indexColeta){
          cardapioCatArray.push(arrayLinha);
          arrayLinha = [];
          indexColeta += 3;
        }
      }
    }

    if (arrayLinha.length > 0){
      cardapioCatArray.push(arrayLinha);
    }

    return cardapioCatArray
  }

  getCardapio(req, res, itemAdicionadoAoCarrinho=''){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      const categoriaParam = req.params.categoria

      db.collection('cardapio').find({categoria: categoriaParam}).toArray((err, result) => {
        if (err) throw err;

        let cardapioCatArray = this.gerarArrayCardapioCategoria(result);

        client.close();

        console.log(itemAdicionadoAoCarrinho);

        res.render('cardapio', {
          params: req.params,
          itensCartegoriaCardapio: cardapioCatArray,
          usuario: req.session.usuario,
          itemAdicionadoAoCarrinho: itemAdicionadoAoCarrinho,
        });

      });
    });
  }

  getItemCardapio(req, res){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      const id_prato = ObjectId(req.params.id_prato);

      db.collection('cardapio').find({_id: id_prato}).toArray((err, result) => {
        if (err) throw err;

        client.close();

        /*
        tratar a URL das fotos para remover 'uploads/'.
        */
        let newFotoUrl = result[0].fotoUrl.slice(7, result[0].fotoUrl.length);
        result[0].fotoUrl = newFotoUrl;

        res.render('itemCardapioDetalhes', {
          fotoUrl: result[0].fotoUrl,
          id: result[0]._id,
          nome: result[0].nome,
          valor: result[0].valor,
          valorCentavos1: result[0].valorCentavos1,
          valorCentavos2: result[0].valorCentavos2,
          categoria: result[0].categoria,
          descricao: result[0].descricao,
          usuario: req.session.usuario,
          itemAdicionadoAoCarrinho: '',
        });

      });
    });
  }

  adicionarItemAoCarrinho(req, res){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      const id_prato = ObjectId(req.query.item_id);

      db.collection('cardapio').find({_id: id_prato}).toArray((err, result) => {
        if (err) throw err;

        client.close();

        /*
        tratar a URL das fotos para remover 'uploads/'.
        */
        let newFotoUrl = result[0].fotoUrl.slice(7, result[0].fotoUrl.length);
        result[0].fotoUrl = newFotoUrl;

        req.session.usuario.carrinho.push(result[0]);

        res.send({
          carrinho: req.session.usuario.carrinho,
          nomeDoItemAdicionado: result[0].nome,
        });

      });
    });
  }

  insertItemCardapio(req, res){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      db.collection('cardapio').insertMany([
          {
            categoria: req.body.categoria,
            fotoUrl: req.file.path,
            nome: req.body.nome,
            valor: req.body.valor,
            valorCentavos1: req.body.valorCentavos1,
            valorCentavos2: req.body.valorCentavos2,
            descricao: req.body.descricao,
          }
       ], (err, result) => {
         if (err) throw err;

         res.render('inserirItemCardapio', {
           msg:{
             alert: 'Item do cardápio inserido com sucesso!',
             categoria: req.body.categoria,
             fotoUrl: req.file.path,
             nome: req.body.nome,
             valor: req.body.valor,
             valorCentavos1: req.body.valorCentavos1,
             valorCentavos2: req.body.valorCentavos2,
             descricao: req.body.descricao,
           },
           categorias: this.categorias,
         });

         client.close();
       });
    });
  }
}

module.exports = Cardapio;
