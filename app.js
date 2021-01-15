var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let inserirNoticiaRouter = require('./routes/inserirNoticia');
let cardapioRouter = require('./routes/cardapio');
let inserirItemCardapioRouter = require('./routes/inserirItemCardapio');
let adicionarItemAoCarrinhoRouter = require('./routes/adicionarItemAoCarrinho');
let removerItemDoCarrinhoRouter = require('./routes/removerItemDoCarrinho');
let carrinhoRouter = require('./routes/carrinho');
let loginRouter = require('./routes/login');
let cadastroRouter = require('./routes/cadastro');
let areaClienteRouter = require('./routes/areaCliente');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hora
app.use(session({
  secret: 'session_secret',
  resave: false,
  saveUninitialized: true,
  name: 'id_session',
  cookie: {
    secure: false,
    httpOnly: false,
    //domain: 'meurestaurante.com',
    path: '/',
    expires: expiryDate,
  }
}));

//session
app.use((req, res, next) => {
  if (!req.session.usuario){
    req.session.usuario = {
      id: '',
      nome: 'anônimo',
      email: '',
      senha: '',
      endereço: {
        rua: '',
        numero: '',
        bairro: '',
        cep: '',
      },
      totalDoCarrinho: '',
      cartoesCadastrados: [],
      carrinho: [],
    }
  }
  next();
});

//setar rotas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/inserir_noticia', inserirNoticiaRouter);
app.use('/cardapio', cardapioRouter);
app.use('/inserir_item_cardapio', inserirItemCardapioRouter);
app.use('/adicionar_item_carrinho', adicionarItemAoCarrinhoRouter);
app.use('/remover_item_carrinho', removerItemDoCarrinhoRouter);
app.use('/carrinho', carrinhoRouter);
app.use('/login', loginRouter);
app.use('/cadastro', cadastroRouter);
app.use('/area_cliente', areaClienteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
