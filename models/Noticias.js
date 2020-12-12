const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'meuRestaurante';

class Noticias {
  constructor() {

  }

  getNoticias(res){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      db.collection('noticias').find().toArray((err, result) => {
        if (err) throw err;

        //console.log(result);
        res.render('index', {noticias: result});
        client.close();
      });
    });
  }

  insertNoticias(req, res){

    let data = new Date();
    let dataStr = data.toString()
    const body = req.body;

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      db.collection('noticias').insertMany([
          {
            data: dataStr,
            titulo: body.titulo,
            texto: body.texto,
          }
       ], (err, result) => {
         if (err) throw err;
         //console.log(result);

         res.render('inserirNoticia', {
           msg:{
             alert: 'Noticia inserida com sucesso!',
             titulo: body.titulo,
             texto: body.texto,
           }
         });

         client.close();
       });
    });
  }
}

module.exports = Noticias;
