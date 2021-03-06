const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'meuRestaurante';

const ObjectId = require('mongodb').ObjectId;
const CryptoJs = require('crypto-js');

class Clientes {
  constructor() {
    this.mensagens = {
      erroSenha: "Erro: Campos 'senha' e 'repetir senha' não são identicos.",
      erroUsuarioJaCadastrado: "Erro: Usuário já cadastrado.",
      erroSenhaInvalida: "Erro: senha atual inválida.",
      erroSenhaNovaInvalida: "Erro: Campos 'nova senha' e 'repetir nova senha' não são identicos.",
      usuarioCadastrado: "Usuário cadastrado com sucesso.",
      senhaAlteradaComSucesso: "Senha alterada com sucesso."
    };
  }

  getCliente(req, res){
    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);
      const id = ObjectId(req.session.usuario.id);

      db.collection('clientes').find({ _id: id }).toArray((err, result) => {
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

          req.session.usuario.endereco.rua = String(result[0].endereco.rua);
          req.session.usuario.endereco.numero = String(result[0].endereco.numero);
          req.session.usuario.endereco.bairro = String(result[0].endereco.bairro);
          req.session.usuario.endereco.cep = String(result[0].endereco.cep);

          req.session.usuario.totalDoCarrinho = String(result[0].totalDoCarrinho);
          req.session.usuario.cartoesCadastrados = result[0].cartoesCadastrados;
          req.session.usuario.carrinho = result[0].carrinho;

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

  checarDados(req, res){
    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);
      const body = req.body;

      db.collection('clientes').find({ email: body.email, senha: body.senha }).toArray((err, result) => {
        if (err) throw err;

        client.close();

        if (result.length > 0){ //checar usuário já cadastrado

          res.render('cadastro', {
            usuario: req.session.usuario,
            msg: {
              erro: this.mensagens.erroUsuarioJaCadastrado
            },
            campos: {
              nome: body.nome,
              email: body.email,
              senha: body.senha,
              senha_r: body.senha_r,
            }
          });
        } else if (body.senha != body.senha_r){ //checar campos senha e repetir senha iguais.

          res.render('cadastro', {
            usuario: req.session.usuario,
            msg: {
              erro: this.mensagens.erroSenha
            },
            campos: {
              nome: body.nome,
              email: body.email,
              senha: body.senha,
              senha_r: body.senha_r,
            }
          });
        } else {
          this.inserirDados(req,res)
        }

      });
    });
  }

  inserirDados(req, res){
    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);
      const body = req.body;

      const usuario = {
        nome: body.nome,
        email: body.email,
        senha: body.senha,
        endereco: {
          rua: '',
          numero: '',
          bairro: '',
          cep: '',
        },
        totalDoCarrinho: '',
        cartoesCadastrados: [],
        carrinho: [],
      };

      db.collection('clientes').insertMany([
          usuario
       ], (err, result) => {
         if (err) throw err;

         console.log(result);

         req.session.usuario.id = String(result.ops[0]._id);
         req.session.usuario.nome = result.ops[0].nome;
         req.session.usuario.email = result.ops[0].email;
         req.session.usuario.senha = result.ops[0].senha;

         res.render('cadastro', {
           usuario: req.session.usuario,
           msg: {
             usuarioCadastrado: this.mensagens.usuarioCadastrado
           },
           campos: {},
         });

         client.close();
       });
    });
  }

  atualizarDados(req, res){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);
      const body = req.body;

      db.collection('clientes').updateOne(
        {
          _id: ObjectId(req.session.usuario.id),
        },
        {
          $set: {
            nome: body.nome,
            endereco: {
              rua: body.rua,
              numero: body.numero,
              bairro: body.bairro,
              cep: body.cep,
            }
          }
        }, (err, result) => {
         if (err) throw err;

         req.session.usuario.nome = body.nome;
         req.session.usuario.endereco.rua = body.rua;
         req.session.usuario.endereco.numero = body.numero;
         req.session.usuario.endereco.bairro = body.bairro;
         req.session.usuario.endereco.cep = body.cep;

         res.render('alterarDadosUsuario',{
           usuario: req.session.usuario,
           msg: {
             sucesso: 'Dados atualizados com sucesso.'
           }
         });

         client.close();
       });
    });
  }

  atualizarDadosDoCarrrinho(req, res){

    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);
      const body = req.body;

      db.collection('clientes').updateOne(
        {
          _id: ObjectId(req.session.usuario.id),
        },
        {
          $set: {
            totalDoCarrinho: req.session.usuario.totalDoCarrinho,
            carrinho: req.session.usuario.carrinho,
          }
        }, (err, result) => {
         if (err) throw err;

         req.session.usuario = {
           id: '',
           nome: 'anônimo',
           email: '',
           senha: '',
           endereco: {
             rua: '',
             numero: '',
             bairro: '',
             cep: '',
           },
           totalDoCarrinho: '',
           cartoesCadastrados: [],
           carrinho: [],
         };

         res.redirect('/');

         client.close();
       });
    });
  }

  checarSenha(req, res){
    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);
      const id = ObjectId(req.session.usuario.id);
      const body = req.body;

      db.collection('clientes').find({ _id: id }).toArray((err, result) => {
        if (err) throw err;

        if (body.senhaAtual != result[0].senha){
          res.render('alterarSenha', {
            usuario: req.session.usuario,
            msg: {
              erro: this.mensagens.erroSenhaInvalida
            }
          });
        } else if (body.senhaNova != body.senhaNovaRepetir){
          res.render('alterarSenha', {
            usuario: req.session.usuario,
            msg: {
              erro: this.mensagens.erroSenhaNovaInvalida
            }
          });
        } else {
          this.alterarSenha(req, res);
        }

        client.close();

      });
    });
  }

  alterarSenha(req, res){
    MongoClient.connect(url, (err, client) => {
      if (err) throw err;

      const db = client.db(dbName);
      const body = req.body;

      db.collection('clientes').updateOne(
        {
          _id: ObjectId(req.session.usuario.id),
        },
        {
          $set: {
            senha: body.senhaNova,
          }
        }, (err, result) => {
         if (err) throw err;

         res.render('alterarSenha', {
           usuario: req.session.usuario,
           msg: {
             sucesso: this.mensagens.senhaAlteradaComSucesso
           }
         });

         client.close();
       });
    });
  }

}

module.exports = Clientes;
