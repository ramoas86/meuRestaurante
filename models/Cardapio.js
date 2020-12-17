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

  getCardapio(res){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      db.collection('cardapio').find().toArray((err, result) => {
        if (err) throw err;

        client.close();

        const cardapio = {}

        for (let cat of this.categorias){
          cardapio[cat] = [];
        }

        for (let cat in cardapio){
          for (let item of result) {
            if (cat == item.categoria){
              /*
              tratar URL para uso na página. O caminho para a foto deve ser a
              subpasta 'fotosCadapio' e o nome do arquivo da foto. Utilizarei
              a função slice para remover 'uploads/' da string.
              */
              let newFotoUrl = item.fotoUrl.slice(7, item.fotoUrl.length);
              item.fotoUrl = newFotoUrl;

              cardapio[cat].push(item);
            }
          }
        }

        //console.log(cardapio);

        res.render('cardapio', {cardapio: cardapio});
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
