const express = require('express');
const router = express.Router();
const inserirNoticiaController = require('../controllers/inserirNoticiaController')

router.get('/', (req, res, next) => {
  inserirNoticiaController(req, res);
});

router.post('/', (req, res, next) => {
  inserirNoticiaController(req, res);
});

module.exports = router;
