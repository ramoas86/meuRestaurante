const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'meuRestaurante';

class Noticias {
  constructor() {

  }

  getNoticias(){
    MongoClient.connect(url, (err, client) => {
      console.log("Connected successfully to server");

      const db = client.db(dbName);

      const findDocument = (db, callback) => {
        // Get the documents collection
        const collection = db.collection('noticias');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
          console.log("Found the following records");
          console.log(docs)
          callback(docs);
        });
      }

      findDocument(db, () => {
        client.close();
      })
    });
  }

  insertNoticias(titulo, texto){

    let data = new Date();
    let dataStr = data.toString()

    MongoClient.connect(url, (err, client) => {
      console.log("Connected successfully to server");

      const db = client.db(dbName);

      const insertDocument = (db, callback) => {
        // Get the documents collection
        const collection = db.collection('noticias');
        //Insert document.
        collection.insertMany([
            {
              data: dataStr,
              titulo: titulo,
              texto: texto,
            }
         ], (err, result) => {
           console.log("Inserted document into the collection.");
           console.log(result);
           callback(result);
         });
      }

      insertDocument(db, () => {
        client.close();
      })
    });
  }
}

module.exports = Noticias;
