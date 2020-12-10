const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

/* GET home page. */
router.get('/', function(req, res, next) {
  indexController(req, res);
});

module.exports = router;
