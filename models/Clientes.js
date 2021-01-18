const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'meuRestaurante';

const CryptoJs = require('crypto-js');

class Clientes {
  constructor() {
    this.mensagens = {
      erroSenha: "Erro: Campos 'senha' e 'repetir senha' não são identicos.",
    };
  }

  checarDados(req, res){
    const obj = req.body;

    if (obj.senha != obj.senha_r){
      return {
        erro: this.mensagens.erroSenha,
        campos: {
          nome: obj.nome,
          email: obj.email,
          senha: obj.senha,
          senha_r: obj.senha_r,
        }
      };
    }

    return {};

  }

  getCliente(req, res){
    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);
      const id = req.session.usuario.id

      db.collection('clientes').find({ id: id}).toArray((err, result) => {
        if (err) throw err;

        client.close();

        res.render('areaCliente', {
          usuario: req.session.usuario,
        });

      });
    });
  }

  logar(req, res){
    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);
      const body = req.body;

      db.collection('clientes').find({ email: body.email, senha: body.senha }).toArray((err, result) => {
        if (err) throw err;

        client.close();

        if (result.length > 0){
          req.session.usuario.id = String(result[0]._id);
          req.session.usuario.nome = String(result[0].nome);
          req.session.usuario.email = String(result[0].email);
          req.session.usuario.senha = String(result[0].senha);

          res.render('areaCliente', {
            usuario: req.session.usuario,
          });
        } else {
          res.render('login',{
            usuario: req.session.usuario,
            carrinho: req.session.usuario.carrinho,
            msg: {
              usuarioNaoCadastrado: 'Usuário não encontrado. E-mail ou senha não conferem.',
              email: body.email,
              senha: body.senha,
            },
          });
        }

      });
    });
  }

  inserirDados(req, res){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);
      const body = req.body;

      db.collection('clientes').insertMany([
          {
            nome: body.nome,
            email: body.email,
            senha: body.senha,
          }
       ], (err, result) => {
         if (err) throw err;

         res.redirect('/area_cliente');

         client.close();
       });
    });
  }
}

module.exports = Clientes;
