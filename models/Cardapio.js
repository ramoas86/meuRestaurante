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

  insertItemCardapio(req, res){

    const body = req.body;

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      db.collection('cardapio').insertMany([
          {
            categoria: body.categoria,
            urlImagem: body.urlImagem,
            nome: body.nome,
            valor: body.valor,
            valorCentavos1: body.valorCentavos1,
            valorCentavos2: body.valorCentavos2,
            descricao: body.descricao,
          }
       ], (err, result) => {
         if (err) throw err;
         console.log(result);

         res.render('inserirItemCardapio', {
           msg:{
             alert: 'Item do cardápio inserido com sucesso!',
             categoria: body.categoria,
             urlImagem: body.urlImagem,
             nome: body.nome,
             valor: body.valor,
             valorCentavos1: body.valorCentavos1,
             valorCentavos2: body.valorCentavos2,
             descricao: body.descricao,
           },
           categorias: cardapioDAO.categorias,
         });

         client.close();
       });
    });
  }
}

module.exports = Cardapio;
