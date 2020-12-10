const Noticias = require('../models/Noticias')

module.exports = (req, res) => {
  const noticiasDAO = new Noticias();
  noticiasDAO.getNoticias();

  res.render('index');
}
