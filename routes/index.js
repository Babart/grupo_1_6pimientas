var express = require('express');
var router = express.Router();
const indexController = require ('../controllers/indexController')

/* GET home page. */
router.get('/', indexController.index);

router.post("/", indexController.indexPop);

//router.get('/home', indexController.home); en contrucción

module.exports = router;
