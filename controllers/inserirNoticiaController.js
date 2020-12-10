const Noticias = require('../models/Noticias');

module.exports = (req, res) => {
  const body = req.body;

  if (body.titulo){
    const noticiasDAO = new Noticias();
    noticiasDAO.insertNoticias(body.titulo, body.texto);

    res.render('inserirNoticia', {
      msg:{
        alert: 'Noticia inserida com sucesso!',
        titulo: body.titulo,
        texto: body.texto,
      }
    });
  } else {
    res.render('inserirNoticia', {msg: {}});
  }

}
