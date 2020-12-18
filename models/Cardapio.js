const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'meuRestaurante';

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

  getCardapio(req, res){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      const categoriaParam = req.params.categoria

      db.collection('cardapio').find({categoria: categoriaParam}).toArray((err, result) => {
        if (err) throw err;

        client.close();

        /*
        tratar a URL das fotos para remover 'uploads/'.
        */
        for (let item of result){
          let newFotoUrl = item.fotoUrl.slice(7, item.fotoUrl.length);
          item.fotoUrl = newFotoUrl;
        }

        res.render('cardapio', {
          params: req.params,
          itensCartegoriaCardapio: result,
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
         //console.log(result);

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
