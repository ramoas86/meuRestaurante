const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'meuRestaurante';

class Noticias {
  constructor() {

  }

  getNoticias(req, res){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      db.collection('noticias').find().toArray((err, result) => {
        if (err) throw err;

        /*
        criar matrix para renderização na view.
        */
        const noticiasArray = [];
        let arrayLinha = [];
        let indexColeta = 2;

        for (let i = 0; i < result.length; i++) {
          if (i <= indexColeta){
            arrayLinha.push(result[i]);
            if (i == indexColeta){
              noticiasArray.push(arrayLinha);
              arrayLinha = [];
              indexColeta += 3;
            }
          }
        }

        if (arrayLinha.length > 0){
          noticiasArray.push(arrayLinha);
        }

        client.close();
        //console.log(result);
        res.render('index', {
          noticias: noticiasArray,
          usuario: req.session.usuario,
        });

      });
    });
  }

  insertNoticias(req, res){

    let data = new Date();
    let dataStr = data.toString()

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);

      db.collection('noticias').insertMany([
          {
            data: dataStr,
            titulo: req.body.titulo,
            texto: req.body.texto,
          }
       ], (err, result) => {
         if (err) throw err;
         //console.log(result);

         res.render('inserirNoticia', {
           msg:{
             alert: 'Noticia inserida com sucesso!',
             titulo: req.body.titulo,
             texto: req.body.texto,
           }
         });

         client.close();
       });
    });
  }
}

module.exports = Noticias;
