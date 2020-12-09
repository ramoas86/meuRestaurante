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
    MongoClient.connect(url, (err, client) => {
      console.log("Connected successfully to server");

      const db = client.db(dbName);

      const insertDocument = (db, callback) => {
        // Get the documents collection
        const collection = db.collection('noticias');
        //Insert document.
        collection.insertMany([
            {
             titulo: titulo,
             texto: texto,
            }
         ], (err, result) => {
           console.log("Inserted document into the collection.");
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
